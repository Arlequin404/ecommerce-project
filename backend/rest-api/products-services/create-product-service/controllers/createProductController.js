const Product = require('../models/product.model');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;

        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProduct = new Product({ name, description, price, stock, category });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};
