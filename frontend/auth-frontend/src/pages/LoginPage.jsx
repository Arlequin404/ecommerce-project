import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ⚠️ Nuevo estado para errores

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reiniciar errores

    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Inicio de sesión exitoso");
        navigate("/dashboard"); // Redirige si la autenticación es correcta
      } else {
        setErrorMessage(data.message || "❌ Credenciales incorrectas");
      }
    } catch (error) {
      console.error("❌ Error de conexión:", error);
      setErrorMessage("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Iniciar Sesión</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* ⚠️ Mensaje de error */}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Ingresar</button>
      </form>

      {/* Botón para redirigir al registro */}
      <p>¿No tienes cuenta?</p>
      <button onClick={() => navigate("/register")}>Registrarse</button>
    </div>
  );
}

export default LoginPage;
