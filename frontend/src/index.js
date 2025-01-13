import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Importa tu componente principal

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root") // Monta la aplicación en el div con id "root" en index.html
);
