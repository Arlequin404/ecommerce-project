import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";  // ✅ Importar nueva página
import CreateProduct from "./components/CreateProduct";  // Importa los componentes
import GetProduct from "./components/GetProduct";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <Routes>
      {/* Rutas para las páginas de login y registro */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas para el dashboard y productos */}
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="get-product" element={<GetProduct />} />
        <Route path="update-product" element={<UpdateProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
