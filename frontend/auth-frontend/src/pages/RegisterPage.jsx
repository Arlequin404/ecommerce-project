import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  const [message, setMessage] = useState("");

  const handleRegister = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Registro exitoso. Puedes iniciar sesión.");
      } else {
        setMessage(`❌ Error: ${data.message || "No se pudo registrar"}`);
      }
    } catch (error) {
      setMessage("❌ Error de conexión con el servidor.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <RegisterForm onRegister={handleRegister} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;
