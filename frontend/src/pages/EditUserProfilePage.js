import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/userService";

const EditUserProfilePage = () => {
    const userId = 1; // ID del usuario que estás editando
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("success");

    // Obtener los datos del perfil del usuario
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(userId);
                setName(data.name || "");
                setPhone(data.phone || "");
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchProfile();
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserProfile(userId, { name, phone });
            setMessage(response.message || "Profile updated successfully!");
            setMessageColor("success");
        } catch (error) {
            console.error("Error updating user profile:", error);
            setMessage("Failed to update profile.");
            setMessageColor("danger");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">
                                <i className="bi bi-pencil-fill"></i> Edit Profile
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="form-control"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    <i className="bi bi-save"></i> Save Changes
                                </button>
                            </form>
                            {message && (
                                <div
                                    className={`alert alert-${messageColor} mt-3 animate__animated animate__fadeIn`}
                                    role="alert"
                                >
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserProfilePage;
