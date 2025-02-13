import React from "react";
import { Link } from "react-router-dom";  // Necesario para usar las rutas

function DashboardPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🎉 Bienvenido al sistema</h2>
      <p>Has iniciado sesión correctamente.</p>

      {/* Menú de navegación */}
      <div style={{ marginTop: "30px" }}>
        <h3>Gestión de Productos</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li><Link to="create-product" style={linkStyle}>Crear Producto</Link></li>
          <li><Link to="get-product" style={linkStyle}>Ver Producto</Link></li>
          <li><Link to="update-product" style={linkStyle}>Actualizar Producto</Link></li>
        </ul>
      </div>
    </div>
  );
}

// Estilo de los enlaces
const linkStyle = {
  textDecoration: "none",
  color: "#61dafb",
  fontSize: "20px",
  display: "block",
  margin: "10px 0"
};

export default DashboardPage;
