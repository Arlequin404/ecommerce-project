import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h1>Página de Inicio de Sesión</h1>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
};

export default LoginPage;
