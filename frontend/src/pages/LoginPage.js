import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("danger");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = await login(username, password);
            setMessage("Login successful!");
            setMessageColor("success");
            localStorage.setItem("authToken", token);
            navigate("/profile");
        } catch (error) {
            setMessage("Invalid username or password.");
            setMessageColor("danger");
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
                {/* Columna izquierda */}
                <div
                    className="col-md-6 bg-primary text-white d-flex flex-column justify-content-center align-items-center p-4"
                    style={{
                        backgroundImage: "url('https://source.unsplash.com/600x800/?shopping')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <h2 className="fw-bold mb-4">Simplify Your Shopping</h2>
                    <p className="text-center">
                        Discover a better way to shop with our user-friendly eCommerce platform.
                    </p>
                    <img
                        src="https://i.ibb.co/ZLzwzVh/logodistri.jpg"
                        alt="eCommerce Illustration"
                        className="img-fluid rounded-circle shadow"
                    />
                </div>

                {/* Columna derecha */}
                <div className="col-md-6 bg-white p-4">
                    <h3 className="text-center mb-4">Welcome Back</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Email or Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <a href="#" className="text-decoration-none">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    {message && (
                        <div className={`alert alert-${messageColor} mt-3`} role="alert">
                            {message}
                        </div>
                    )}
                    <div className="text-center mt-4">
                        <small>Or Login with</small>
                        <div className="d-flex justify-content-center mt-2">
                            <button className="btn btn-outline-secondary mx-2">
                                <i className="bi bi-google"></i> Google
                            </button>
                            <button className="btn btn-outline-secondary mx-2">
                                <i className="bi bi-facebook"></i> Facebook
                            </button>
                        </div>
                        <p className="mt-3">
                            Don't have an account? <a href="#" className="text-decoration-none">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
