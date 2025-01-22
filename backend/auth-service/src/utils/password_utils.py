import bcrypt

def hash_password(password):
    """
    Genera un hash seguro para la contraseña proporcionada.
    """
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(plain_password, hashed_password):
    """
    Verifica si la contraseña proporcionada coincide con el hash almacenado.
    """
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
