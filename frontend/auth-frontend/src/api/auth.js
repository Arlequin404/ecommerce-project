import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Error desconocido" };
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Error desconocido" };
    }
};
