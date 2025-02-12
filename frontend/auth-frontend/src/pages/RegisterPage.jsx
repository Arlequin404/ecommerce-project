import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    role: "customer",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name || !formData.phone) {
      setError("❌ Todos los campos obligatorios deben completarse.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Las contraseñas no coinciden.");
      return;
    }

    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          postal_code: formData.postal_code,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccess("✅ Usuario registrado exitosamente.");
        setTimeout(() => navigate("/"), 2000); // Redirigir al login después de 2 segundos
      } else {
        setError(data.message || "❌ Error al registrar usuario.");
      }
    } catch (error) {
      setError("❌ Error en el servidor. Intente de nuevo más tarde.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registro de Usuario</h2>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <form onSubmit={handleRegister} style={styles.form}>
        <input type="text" name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} />
        <input type="text" name="city" placeholder="Ciudad" value={formData.city} onChange={handleChange} />
        <input type="text" name="country" placeholder="País" value={formData.country} onChange={handleChange} />
        <input type="text" name="postal_code" placeholder="Código Postal" value={formData.postal_code} onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>

      {/* Botón para ir al Login */}
      <p>¿Ya tienes una cuenta?</p>
      <button onClick={() => navigate("/")}>Iniciar Sesión</button>
    </div>
  );
}

// Estilos básicos en línea
const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  error: { color: "red", fontWeight: "bold" },
  success: { color: "green", fontWeight: "bold" },
};

export default RegisterPage;
