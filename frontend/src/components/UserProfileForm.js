import React, { useState, useEffect } from "react";

const UserProfileForm = ({ userId, onSubmit }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        // Obtener datos iniciales del usuario
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/user/${userId}`);
                const data = await response.json();
                setName(data.name || "");
                setPhone(data.phone || "");
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, [userId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, phone });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default UserProfileForm;
