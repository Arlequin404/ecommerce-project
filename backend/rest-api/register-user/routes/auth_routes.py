from flask import Blueprint, request, jsonify
from config.database import get_db_connection
import bcrypt
import psycopg2

auth_blueprint = Blueprint("auth", __name__)

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

        return jsonify({"message": "✅ Usuario registrado exitosamente", "user_id": user_id}), 201

    except psycopg2.Error as e:
        return jsonify({"message": "❌ Error en la base de datos", "error": str(e)}), 500
    except Exception as e:
        return jsonify({"message": "❌ Error en el servidor", "error": str(e)}), 500
