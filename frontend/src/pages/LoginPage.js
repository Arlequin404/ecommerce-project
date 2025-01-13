import React, { useState } from "react";
import { login } from "../services/authService";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = await login(username, password);
            setMessage("Login successful!");
            setMessageColor("green");
            console.log("Token:", token);
            // Aquí podrías redirigir al usuario o guardar el token en localStorage
        } catch (error) {
            setMessage("Invalid username or password.");
            setMessageColor("red");
        }
    };

    const [messageColor, setMessageColor] = useState("red");

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p style={{ color: messageColor }}>{message}</p>}
        </div>
    );
};

export default LoginPage;
