from utils.password_utils import check_password
from models.user_model import User

def login_user(username, plain_password):
    # Buscar al usuario por nombre de usuario
    user = User.query.filter_by(username=username).first()
    if not user:
        return {"message": "User not found"}, 404

    # Verificar la contraseña
    if not check_password(plain_password, user.password):
        return {"message": "Invalid credentials"}, 401

    # Generar un token o devolver éxito
    return {"message": "Login successful", "user_id": user.id}, 200
