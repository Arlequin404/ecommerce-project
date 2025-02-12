const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const updateProductRoutes = require('./routes/updateProductRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api', updateProductRoutes);

// Agrega un log para saber si el servidor inicia correctamente
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`✅ Update Product Service running on port ${PORT}`));

console.log("🟢 Server started...");
console.log(`🔗 API available at: http://localhost:${PORT}/api/products/{id}`);
