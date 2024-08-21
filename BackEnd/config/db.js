const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this line is present if using a .env file

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Registerdata', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
