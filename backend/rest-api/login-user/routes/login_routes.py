from flask import Blueprint, request, jsonify
from config.database import get_db_connection

login_blueprint = Blueprint("login", __name__)  # 📌 Asegúrate que el nombre es correcto

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
