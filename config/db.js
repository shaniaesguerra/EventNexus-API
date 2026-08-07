const path = require('path');
const dns = require('dns');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Force DNS resolution through public resolvers before MongoDB SRV lookup.
// This avoids local DNS, VPN or network setups that block MongoDB Atlas SRV records.
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

const CONNECT_OPTIONS = {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  family: 4,
  maxPoolSize: 10,
};

const getMongoUri = () =>
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  process.env.Mongodb_URI ||
  process.env['Mongodb URI'];

const isConnected = () =>
  mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2;

const tryConnect = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, CONNECT_OPTIONS);
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    return false;
  }
};

let reconnectTimer = null;

const scheduleReconnect = (mongoUri) => {
  if (reconnectTimer) {
    return;
  }

  console.warn('Scheduling MongoDB reconnect attempts every 15s...');
  reconnectTimer = setInterval(async () => {
    if (isConnected()) {
      clearInterval(reconnectTimer);
      reconnectTimer = null;
      return;
    }

    dns.setServers(['8.8.8.8', '1.1.1.1']);
    if (await tryConnect(mongoUri)) {
      console.log('MongoDB reconnected');
      clearInterval(reconnectTimer);
      reconnectTimer = null;
    }
  }, 15000);
};

const connectDB = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    console.warn('MongoDB connection string is not set. Add MONGO_URI or MONGODB_URI to your .env file.');
    return false;
  }

  if (isConnected()) {
    return true;
  }

  // Force public DNS before every attempt.
  dns.setServers(['8.8.8.8', '1.1.1.1']);

  // Retry a few times immediately (handles slow DNS/VPN startup).
  for (let attempt = 1; attempt <= 3; attempt++) {
    if (await tryConnect(mongoUri)) {
      return true;
    }

    if (attempt < 3) {
      console.warn(`Retrying MongoDB connection (attempt ${attempt + 1}/3)...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.error('Failed to connect to MongoDB. Starting server without database connection.');

  // Keep trying in the background so the app recovers once the network allows it.
  scheduleReconnect(mongoUri);

  return false;
};

module.exports = connectDB;
