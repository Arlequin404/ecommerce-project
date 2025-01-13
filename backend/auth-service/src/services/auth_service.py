from werkzeug.security import check_password_hash
from models.user_model import User
from utils.jwt_utils import generate_jwt

def login_user(data):
    username = data.get('username')
    password = data.get('password')

    # Verificar usuario en la base de datos
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return {"message": "Invalid credentials"}, 401

    # Generar token JWT
    token = generate_jwt(user.id)
    return {"access_token": token}, 200
