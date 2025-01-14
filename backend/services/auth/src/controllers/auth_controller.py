from flask import request, jsonify
from src.models.user_model import User
from src.database.db import db
from werkzeug.security import generate_password_hash
import jwt
import datetime
import os

def register_user():
    try:
        # Obtener datos del cuerpo de la solicitud
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        phone = data.get('phone')
        address = data.get('address')
        city = data.get('city')
        country = data.get('country')
        postal_code = data.get('postal_code')
        role = data.get('role', 'customer')  # Por defecto 'customer'

        # Verificar si el usuario ya existe
        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'User already exists'}), 400

        # Encriptar la contraseña
        hashed_password = generate_password_hash(password, method='sha256')

        # Crear un nuevo usuario
        new_user = User(
            email=email,
            password=hashed_password,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            address=address,
            city=city,
            country=country,
            postal_code=postal_code,
            role=role
        )
        db.session.add(new_user)
        db.session.commit()

        # Generar un token JWT
        token = jwt.encode({'id': str(new_user.id), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                           os.getenv('JWT_SECRET'), algorithm='HS256')

        return jsonify({'message': 'User registered successfully', 'token': token}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
