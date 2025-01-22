from src.models.user_model import User, db
from werkzeug.security import generate_password_hash
from src.app import create_app

# Crear la aplicación Flask
app = create_app()

# Contexto de la aplicación para interactuar con la base de datos
with app.app_context():
    # Crear un nuevo usuario
    user = User(
        username="Sebas",
        email="sebasgm78@gmail.com",
        password=generate_password_hash("sebas123"),  # Contraseña hasheada
        name="EsWonder",
        phone="1234567890"
    )

    # Agregar el usuario a la base de datos
    db.session.add(user)
    db.session.commit()

    print("Usuario de prueba creado con éxito.")
