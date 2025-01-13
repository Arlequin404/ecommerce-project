from flask import Blueprint, request
from services.auth_service import login_user

auth_bp = Blueprint('auth', __name__)

# Ruta para el login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return login_user(data)
