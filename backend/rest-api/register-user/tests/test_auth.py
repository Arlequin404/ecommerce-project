import unittest
import json
from src.app import app

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
    
    def test_register(self):
        response = self.app.post('/auth/register', json={
            "email": "test@example.com",
            "password": "password123",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "1234567890"
        })
        self.assertEqual(response.status_code, 201)

    def test_login(self):
        response = self.app.post('/auth/login', json={
            "email": "test@example.com",
            "password": "password123"
        })
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
