from flask import Flask
from flask_cors import CORS
from config.database import init_db
from routes.login_routes import login_blueprint  # Asegurar que se importe correctamente
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'supersecretkey')

# Habilitar CORS
CORS(app, resources={r"/auth/*": {"origins": "*"}})

# Inicializar base de datos
init_db()

# Registrar blueprint de login
app.register_blueprint(login_blueprint, url_prefix='/auth')

if __name__ == '__main__':
    print("✅ Servidor de Login Iniciado en http://127.0.0.1:5001")
    app.run(debug=True, port=5001)
