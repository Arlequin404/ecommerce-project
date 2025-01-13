from flask_jwt_extended import create_access_token
from datetime import timedelta

def generate_jwt(user_id):
    expires = timedelta(hours=1)
    return create_access_token(identity={'id': user_id}, expires_delta=expires)
