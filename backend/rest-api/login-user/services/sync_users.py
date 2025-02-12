import psycopg2
import os
from config.database import get_db_connection

def sync_users():
    """Sincroniza la base de datos de login con la de registro."""
    
    # Conexión a la base de datos de registro
    register_conn = psycopg2.connect(
        dbname=os.getenv("REGISTER_DB_NAME"),
        user=os.getenv("REGISTER_DB_USER"),
        password=os.getenv("REGISTER_DB_PASSWORD"),
        host=os.getenv("REGISTER_DB_HOST"),
        port=os.getenv("REGISTER_DB_PORT"),
        client_encoding='UTF8'
    )

    login_conn = get_db_connection()

    reg_cursor = register_conn.cursor()
    log_cursor = login_conn.cursor()

    # Obtener usuarios de la base de datos de registro
    reg_cursor.execute("SELECT * FROM users;")
    users = reg_cursor.fetchall()

    # Insertar usuarios en la base de datos de login si no existen
    for user in users:
        log_cursor.execute(
            """
            INSERT INTO users (id, email, password, first_name, last_name, phone, address, city, country, postal_code, role, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING;
            """,
            user
        )



    login_conn.commit()
    reg_cursor.close()
    log_cursor.close()
    register_conn.close()
    login_conn.close()
