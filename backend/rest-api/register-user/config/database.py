import psycopg2
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Detectar si es el microservicio de login o register
SERVICE_TYPE = os.getenv("SERVICE_TYPE", "register")  # Por defecto es register

# Configurar la conexión a la base de datos según el servicio
if SERVICE_TYPE == "login":
    DB_NAME = os.getenv("LOGIN_DB_NAME")
    DB_USER = os.getenv("LOGIN_DB_USER")
    DB_PASSWORD = os.getenv("LOGIN_DB_PASSWORD")
    DB_HOST = os.getenv("LOGIN_DB_HOST")
    DB_PORT = os.getenv("LOGIN_DB_PORT")
else:
    DB_NAME = os.getenv("REGISTER_DB_NAME")
    DB_USER = os.getenv("REGISTER_DB_USER")
    DB_PASSWORD = os.getenv("REGISTER_DB_PASSWORD")
    DB_HOST = os.getenv("REGISTER_DB_HOST")
    DB_PORT = os.getenv("REGISTER_DB_PORT")

def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        return conn
    except Exception as e:
        print(f"❌ Error al conectar a la base de datos ({SERVICE_TYPE}): {e}")
        return None

def init_db():
    try:
        conn = get_db_connection()
        if not conn:
            return

        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(120) UNIQUE NOT NULL,
                password VARCHAR(200) NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                phone VARCHAR(15) NOT NULL,
                address TEXT,
                city VARCHAR(100),
                country VARCHAR(100),
                postal_code VARCHAR(10),
                role VARCHAR(50) DEFAULT 'customer',
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        """)
        conn.commit()
        cur.close()
        conn.close()
        print(f"✅ Base de datos ({SERVICE_TYPE}) inicializada correctamente")
    except Exception as e:
        print(f"❌ Error al inicializar la base de datos ({SERVICE_TYPE}): {e}")
