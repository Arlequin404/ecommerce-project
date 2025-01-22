from flask import jsonify
from models.user_model import User, db

# Servicio para obtener el perfil de usuario
def get_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "name": user.name,
        "phone": user.phone
    }), 200

# Servicio para actualizar el perfil de usuario
def update_user_profile(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    user.name = data.get('name', user.name)
    user.phone = data.get('phone', user.phone)
    db.session.commit()

    return jsonify({"message": "User updated successfully"}), 200
