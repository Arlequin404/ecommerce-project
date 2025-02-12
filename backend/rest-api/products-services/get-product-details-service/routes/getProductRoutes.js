const express = require('express');
const { getProduct } = require('../controllers/getProductController');
const router = express.Router();

router.get('/products/:id', getProduct);

module.exports = router;
