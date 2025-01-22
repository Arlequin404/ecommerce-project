from flask import Blueprint, request, jsonify
from models.user_model import User, db

user_bp = Blueprint('user', __name__)

# Obtener perfil del usuario
@user_bp.route('/profile/<int:user_id>', methods=['GET'])
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
    })

# Actualizar perfil del usuario
@user_bp.route('/profile/<int:user_id>', methods=['PUT'])
def update_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    user.name = data.get("name", user.name)
    user.phone = data.get("phone", user.phone)

    db.session.commit()
    return jsonify({"message": "Profile updated successfully!"})
