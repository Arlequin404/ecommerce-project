import React, { useState } from 'react';
import { createProduct } from '../api';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, price, stock, category };
    const response = await createProduct(newProduct);
    if (response) {
      setMessage('Product created successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('');
    } else {
      setMessage('Failed to create product');
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Create Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateProduct;
