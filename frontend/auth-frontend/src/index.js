import React from "react";
import ReactDOM from "react-dom";
import App from "./App";  // Este archivo debe existir
import './index.css'; // Si tienes estilos globales

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
