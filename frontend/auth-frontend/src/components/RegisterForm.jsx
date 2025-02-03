import React, { useState } from "react";
import "../styles/RegisterForm.css"; // Importamos el CSS

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData); // Función para enviar datos al backend
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Apellido:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Ciudad:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>País:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Código Postal:</label>
          <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} />
        </div>

        <button type="submit" className="btn-register">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
