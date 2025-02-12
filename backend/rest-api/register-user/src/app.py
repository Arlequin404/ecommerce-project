import sys
import os

#  Agregar la ruta base del proyecto para evitar errores de importación
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS  #  Importar CORS
from config.database import init_db
from routes.auth_routes import auth_blueprint
from dotenv import load_dotenv

#  Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

jwt = JWTManager(app)

#  Habilitar CORS para todas las rutas
CORS(app, resources={r"/auth/*": {"origins": "*"}})

#  Inicializar la base de datos y manejar errores
try:
    init_db()
    print("✅ Base de datos inicializada correctamente.")
except Exception as e:
    print(f"❌ Error al inicializar la base de datos: {e}")

#  Registrar blueprints
app.register_blueprint(auth_blueprint, url_prefix='/auth')

if __name__ == '__main__':
    app.run(debug=True)
