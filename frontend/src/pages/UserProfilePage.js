import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/userService";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la navegación

const UserProfilePage = () => {
    const userId = 1; // Simulamos que el usuario autenticado tiene el ID 1
    const [userData, setUserData] = useState({});
    const navigate = useNavigate(); // Inicializamos useNavigate

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(userId);
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchProfile();
    }, []);

    // Función para manejar la redirección al formulario de edición
    const handleEditProfile = () => {
        navigate("/profile/edit");
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <img
                                    src="https://i.ibb.co/3hzSGny/11817449.png"
                                    alt="User Avatar"
                                    className="rounded-circle shadow"
                                    style={{ width: "200px", height: "200px" }} // Tamaño reducido
                                />
                            </div>

                            <h3 className="card-title mb-3">{userData.name || "User Name"}</h3>
                            <p className="text-muted">{userData.email || "user@example.com"}</p>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <p>
                                        <i className="bi bi-phone-fill text-primary"></i> {userData.phone || "No Phone"}
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p>
                                        <i className="bi bi-person-fill text-primary"></i> {userData.username || "No Username"}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="btn btn-outline-primary w-100 mt-3"
                                onClick={handleEditProfile} // Agregamos la función al botón
                            >
                                <i className="bi bi-pencil-square"></i> Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
