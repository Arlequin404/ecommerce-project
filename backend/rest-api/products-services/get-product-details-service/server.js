const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const getProductRoutes = require('./routes/getProductRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api', getProductRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`✅ Get Product Service running on port ${PORT}`));
