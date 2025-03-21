// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const goalRoutes = require('./routes/goalRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 5006;

// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);   // for register/login
app.use('/api/goals', goalRoutes);  // existing goal routes
app.use('/api/admin', adminRoutes); // admin-only routes

// Example root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
