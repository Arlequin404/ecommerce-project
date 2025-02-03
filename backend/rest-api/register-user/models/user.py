from config.database import get_db_connection

class UserModel:
    @staticmethod
    def create_user(email, password, first_name, last_name, phone, address, city, country, postal_code, role='customer'):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO users (email, password, first_name, last_name, phone, address, city, country, postal_code, role)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
        """, (email, password, first_name, last_name, phone, address, city, country, postal_code, role))
        user_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return user_id

    @staticmethod
    def get_user_by_email(email):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, email, password FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        cur.close()
        conn.close()
        return user
