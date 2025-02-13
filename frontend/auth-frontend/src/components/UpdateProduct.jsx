import React, { useState } from 'react';
import { updateProduct } from '../api';

const UpdateProduct = () => {
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { price, stock };
    const response = await updateProduct(id, updatedData);
    if (response) {
      setMessage('Product updated successfully!');
      setId('');
      setPrice('');
      setStock('');
    } else {
      setMessage('Failed to update product');
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="number"
          placeholder="New Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="New Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type="submit">Update Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProduct;
