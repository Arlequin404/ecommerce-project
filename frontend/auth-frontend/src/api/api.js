import axios from 'axios';

// Configurar el baseURL para los microservicios
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Cambia la URL si es necesario
});

// Crear un producto
export const createProduct = async (product) => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

// Obtener un producto
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

// Actualizar un producto
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await api.put(`/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};
