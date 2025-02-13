import React, { useState } from 'react';
import { getProduct } from '../api';

const GetProduct = () => {
  const [id, setId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getProduct(id);
    if (response) {
      setProduct(response);
      setError('');
    } else {
      setError('Product not found');
      setProduct(null);
    }
  };

  return (
    <div>
      <h2>Get Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Get Product</button>
      </form>

      {error && <p>{error}</p>}
      {product && (
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Category: {product.category}</p>
        </div>
      )}
    </div>
  );
};

export default GetProduct;
