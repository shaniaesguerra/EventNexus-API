const path = require('path');
const dns = require('dns');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Force DNS resolution through public resolvers before MongoDB SRV lookup.
// This avoids local DNS or network setups that block MongoDB Atlas SRV records.
dns.setServers(['8.8.8.8', '1.1.1.1']);
console.log('db.js: DNS servers set to', dns.getServers());

dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.set('strictQuery', false);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected.');
});

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.Mongodb_URI || process.env['Mongodb URI'];

  if (!mongoUri) {
    console.warn('MongoDB connection string is not set. Add MONGO_URI or MONGODB_URI to your .env file.');
    return false;
  }

  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (mongoose.connection.readyState === 2) {
    return true;
  }

  // Try connecting normally first
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10,
    });

    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);

    // If the error indicates SRV/DNS resolution failure, attempt a retry using public DNS servers.
    if (error.message && /querySrv|ENOTFOUND|ECONNREFUSED/i.test(error.message) && mongoUri.startsWith('mongodb+srv://')) {
      try {
        const dns = require('dns');
        // Use Google's and Cloudflare's public DNS as a fallback for SRV resolution
        dns.setServers(['8.8.8.8', '1.1.1.1']);
        console.warn('Retrying MongoDB SRV resolution using public DNS servers (8.8.8.8, 1.1.1.1)');

        await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 10000,
          socketTimeoutMS: 45000,
          family: 4,
          maxPoolSize: 10,
        });

        console.log('MongoDB connected (via DNS fallback)');
        return true;
      } catch (retryError) {
        console.error('MongoDB retry error (DNS fallback):', retryError.message);
      }
    }

    return false;
  }
};

module.exports = connectDB;
