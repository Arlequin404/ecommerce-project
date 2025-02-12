const express = require('express');
const { updateProduct } = require('../controllers/updateProductController');
const router = express.Router();

router.put('/products/:id', updateProduct);

module.exports = router;
