from werkzeug.security import generate_password_hash
import psycopg2

# Conexión a la base de datos
conn = psycopg2.connect(
    dbname="ecommerce",
    user="postgres",
    password="12345",
    host="localhost"
)
cursor = conn.cursor()

# Insertar un usuario de prueba
hashed_password = generate_password_hash("test_password")
cursor.execute(
    "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
    ("test_user", "test_user@example.com", hashed_password)
)

# Confirmar cambios y cerrar la conexión
conn.commit()
cursor.close()
conn.close()

print("Usuario de prueba insertado correctamente.")
