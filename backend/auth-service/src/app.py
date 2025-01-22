from flask import Flask
from flask_jwt_extended import JWTManager
from src.models.user_model import db
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp  # Importamos el blueprint de las rutas de usuario

def create_app():
    app = Flask(__name__)

    # Configuración de JWT y la base de datos
    app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Cambia esto por una clave segura
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost:5432/ecommerce'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializar extensiones
    JWTManager(app)
    db.init_app(app)

    # Rutas disponibles
    @app.route('/')
    def index():
        return {"message": "Welcome to the Auth and User Profile Service"}

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')  # Blueprint de autenticación
    app.register_blueprint(user_bp, url_prefix='/user')  # Blueprint de perfil de usuario

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
