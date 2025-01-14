from flask import Flask
from flask_cors import CORS  # Importar CORS
from src.database.db import init_db
from src.routes.auth_routes import auth_routes

def create_app():
    app = Flask(__name__)

    # Habilitar CORS para aceptar solicitudes desde el frontend
    CORS(app)

    # Configuración de la base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:8991@localhost:5432/auth_service'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializar la base de datos
    init_db(app)

    # Registrar rutas
    app.register_blueprint(auth_routes, url_prefix='/api/auth')

    # Ruta raíz
    @app.route('/', methods=['GET'])
    def home():
        return {"message": "Welcome to the Auth Service!"}

    return app
