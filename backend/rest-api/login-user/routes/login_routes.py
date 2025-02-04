from flask import Blueprint, request, jsonify
from config.database import get_db_connection
import bcrypt
import requests

login_blueprint = Blueprint("login", __name__)  # 📌 Nombre del blueprint correcto

# 🔹 Ruta para sincronizar usuarios desde register-user a login-user
@login_blueprint.route("/sync-user", methods=["POST"])
def sync_user():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Verificar si el usuario ya existe
        cursor.execute("SELECT id FROM users WHERE email = %s;", (data["email"],))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"message": "⚠️ El usuario ya existe en login"}), 409

        # Insertar usuario en la base de datos de login
        cursor.execute("""
            INSERT INTO users (id, email, password, first_name, last_name, phone, address, city, country, postal_code, role)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
        """, (
            data["user_id"], data["email"], data["password"], data["first_name"], 
            data["last_name"], data["phone"], data["address"], data["city"], 
            data["country"], data["postal_code"], data["role"]
        ))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "✅ Usuario sincronizado con éxito"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 🔹 Ruta para el **inicio de sesión**
@login_blueprint.route("/login", methods=["POST"])
def login_user():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")  # Contraseña ingresada por el usuario

        if not email or not password:
            return jsonify({"message": "❌ Email y contraseña son obligatorios"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Buscar el usuario en la base de datos
        cursor.execute("SELECT id, email, password FROM users WHERE email = %s;", (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            user_id, user_email, hashed_password = user

            print(f"🔍 Hash en BD: {hashed_password}")  # DEBUG: Verificar hash en BD
            print(f"🔍 Contraseña ingresada: {password}")  # DEBUG: Verificar ingresada

            # 🔹 Convertir el hash almacenado en la base de datos a `bytes`
            hashed_password_bytes = hashed_password.encode("utf-8")

            # 🔹 Comparar contraseñas correctamente con bcrypt
            if bcrypt.checkpw(password.encode("utf-8"), hashed_password_bytes):
                print("✅ Contraseña correcta. Usuario autenticado.")
                return jsonify({"message": "✅ Inicio de sesión exitoso", "user_id": user_id}), 200
            else:
                print("❌ Error: Contraseña incorrecta")  # DEBUG para ver el fallo en la comparación
                return jsonify({"message": "❌ Credenciales incorrectas"}), 401

        return jsonify({"message": "❌ Usuario no encontrado"}), 404

    except Exception as e:
        return jsonify({"message": "❌ Error en el servidor", "error": str(e)}), 500


# 🔹 Función para sincronizar usuarios cuando el microservicio se inicie
REGISTER_DB_URL = "http://localhost:5000/auth/get-all-users"

def sync_users_on_startup():
    try:
        print("🔄 Intentando sincronizar usuarios al iniciar el servicio...")  # DEBUG

        response = requests.get(REGISTER_DB_URL)
        if response.status_code == 200:
            users = response.json().get("users", [])

            if not users:
                print("⚠️ No hay usuarios para sincronizar.")
                return

            conn = get_db_connection()
            cursor = conn.cursor()

            for user in users:
                cursor.execute("SELECT id FROM users WHERE email = %s;", (user["email"],))
                existing_user = cursor.fetchone()

                if not existing_user:
                    cursor.execute("""
                        INSERT INTO users (id, email, password, first_name, last_name, phone, address, city, country, postal_code, role)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                    """, (
                        user["user_id"], user["email"], user["password"], user["first_name"], 
                        user["last_name"], user["phone"], user["address"], user["city"], 
                        user["country"], user["postal_code"], user["role"]
                    ))
                    conn.commit()
                    print(f"✅ Usuario {user['email']} sincronizado")

            cursor.close()
            conn.close()

            print("✅ Todos los usuarios han sido sincronizados correctamente")

        else:
            print(f"⚠️ No se pudo obtener los usuarios desde register-user. Código: {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"⚠️ Error de conexión con register-user: {e}")
    except Exception as e:
        print(f"⚠️ Error al sincronizar usuarios: {e}")

# Llamar a la función cuando el microservicio de login se inicia
sync_users_on_startup()
