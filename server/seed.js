// server/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const adminUsername = 'admin1'; // Change as desired
    const adminPassword = '123'; // Change as desired

    // Check if an admin account already exists
    const existingAdmin = await User.findOne({ username: adminUsername });
    if (existingAdmin) {
      console.log('Admin account already exists');
    } else {
      const admin = new User({
        username: adminUsername,
        password: adminPassword,
        role: 'admin', // Set role explicitly
      });
      await admin.save();
      console.log('Admin account created successfully');
    }
  } catch (err) {
    console.error('Error seeding admin account:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
