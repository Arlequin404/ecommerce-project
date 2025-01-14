from flask import Blueprint
from src.controllers.auth_controller import register_user

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    return register_user()
