const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.PORT;

  if (!mongoUri) {
    console.warn('MongoDB connection string is not set. Add MONGODB_URI to your .env file to connect to MongoDB to proceed.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    return false;
  }
};

module.exports = connectDB;
