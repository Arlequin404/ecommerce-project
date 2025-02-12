import psycopg2
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def get_db_connection():
    """Establece conexión con la base de datos de login."""
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("LOGIN_DB_NAME"),
            user=os.getenv("LOGIN_DB_USER"),
            password=os.getenv("LOGIN_DB_PASSWORD"),
            host=os.getenv("LOGIN_DB_HOST"),
            port=os.getenv("LOGIN_DB_PORT"),
            client_encoding="UTF8"  # 🔹 Forzar codificación UTF-8
        )
        return conn
    except psycopg2.Error as e:
        print(f"Error de conexión a PostgreSQL: {e}")
        return None

def init_db():
    """Inicializa la base de datos y crea la tabla de usuarios si no existe."""
    conn = get_db_connection()
    if conn is None:
        print("⛔ Error: No se pudo conectar a la base de datos")
        return

    cursor = conn.cursor()

    cursor.execute("""
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
    cursor.close()
    conn.close()
    print("✅ Base de datos inicializada correctamente")
