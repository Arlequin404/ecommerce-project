class User:
    def __init__(self, id, email, password, first_name, last_name, phone, address, city, country, postal_code, role):
        self.id = id
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.phone = phone
        self.address = address
        self.city = city
        self.country = country
        self.postal_code = postal_code
        self.role = role

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone": self.phone,
            "address": self.address,
            "city": self.city,
            "country": self.country,
            "postal_code": self.postal_code,
            "role": self.role
        }
