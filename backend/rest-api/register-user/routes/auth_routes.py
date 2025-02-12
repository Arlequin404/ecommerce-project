from flask import Blueprint, request, jsonify
from config.database import get_db_connection
import bcrypt
import psycopg2
import requests  # 📌 Importar requests para sincronización automática

auth_blueprint = Blueprint("auth", __name__)

# URL del microservicio de login
LOGIN_SERVICE_URL = "http://localhost:5001/auth/sync-user"

# 🔹 Ruta para registrar un usuario y sincronizarlo con login-user
@auth_blueprint.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        phone = data.get("phone")
        address = data.get("address")
        city = data.get("city")
        country = data.get("country")
        postal_code = data.get("postal_code")
        role = data.get("role", "customer")

        if not all([email, password, first_name, last_name, phone]):
            return jsonify({"message": "❌ Faltan datos obligatorios"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Verificar si el usuario ya existe
        cursor.execute("SELECT id FROM users WHERE email = %s;", (email,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"message": "⚠️ El usuario ya existe"}), 409

        # Encriptar contraseña
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        # Insertar usuario en la base de datos
        cursor.execute("""
            INSERT INTO users (email, password, first_name, last_name, phone, address, city, country, postal_code, role)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """, (email, hashed_password, first_name, last_name, phone, address, city, country, postal_code, role))

        user_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()

        # 📌 Sincronizar usuario con login-user
        sync_payload = {
            "user_id": user_id,
            "email": email,
            "password": hashed_password,  # Se envía encriptada
            "first_name": first_name,
            "last_name": last_name,
            "phone": phone,
            "address": address,
            "city": city,
            "country": country,
            "postal_code": postal_code,
            "role": role
        }

        try:
            response = requests.post(LOGIN_SERVICE_URL, json=sync_payload, timeout=5)
            if response.status_code != 201:
                return jsonify({"message": "⚠️ Usuario registrado pero no sincronizado con login", "error": response.json()}), 202
        except requests.exceptions.RequestException as e:
            return jsonify({"message": "⚠️ Usuario registrado pero no sincronizado con login", "error": str(e)}), 202

        return jsonify({"message": "✅ Usuario registrado y sincronizado", "user_id": user_id}), 201

    except psycopg2.Error as e:
        return jsonify({"message": "❌ Error en la base de datos", "error": str(e)}), 500
    except Exception as e:
        return jsonify({"message": "❌ Error en el servidor", "error": str(e)}), 500


# 🔹 **Nueva ruta para obtener todos los usuarios** (Para sincronización en login-user)
@auth_blueprint.route("/get-all-users", methods=["GET"])
def get_all_users():
    """ Obtener todos los usuarios registrados para sincronización """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Obtener todos los usuarios de la base de datos
        cursor.execute("SELECT id, email, password, first_name, last_name, phone, address, city, country, postal_code, role FROM users;")
        users = cursor.fetchall()

        cursor.close()
        conn.close()

        # Convertir los datos a formato JSON
        user_list = [
            {
                "user_id": user[0],
                "email": user[1],
                "password": user[2],  # La contraseña ya está hasheada
                "first_name": user[3],
                "last_name": user[4],
                "phone": user[5],
                "address": user[6],
                "city": user[7],
                "country": user[8],
                "postal_code": user[9],
                "role": user[10]
            }
            for user in users
        ]

        return jsonify({"users": user_list}), 200

    except Exception as e:
        return jsonify({"message": "❌ Error al obtener usuarios", "error": str(e)}), 500
