const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const createProductRoutes = require('./routes/createProductRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api', createProductRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Create Product Service running on port ${PORT}`));
