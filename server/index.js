// ✅ MUST be first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

// ✅ Now it's safe to import after .env is loaded
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

console.log("🔐 DB_USER from .env:", process.env.DB_USER); // Should print: root

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
