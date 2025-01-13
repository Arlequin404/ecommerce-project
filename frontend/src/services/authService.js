const API_URL = "http://127.0.0.1:5000/auth";

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Invalid username or password");
        }

        const data = await response.json();
        return data.access_token; // Devuelve el token JWT
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};
