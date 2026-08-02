const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Top-level redirect middleware to catch case-variant Swagger paths 
app.use((req, res, next) => {
  try {
    const raw = (req.originalUrl || req.url || '').split('?')[0];
    if (/^\/api-?docs?(\/.*)?$/i.test(raw)) {
      if (raw.toLowerCase() === '/api-docs' || raw.toLowerCase().startsWith('/api-docs/')) {
        return next();
      }
      return res.redirect(301, '/api-docs');
    }
  } catch (e) {
    // proceed if anything goes wrong
  }
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for API and Swagger UI
app.use(cors());

// Simple request logger to help debug routing
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.originalUrl || req.url, '-> path:', req.path);
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/', require('./routes') );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const startServer = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error('MongoDB is unavailable. The server will not start until the database connection succeeds.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { app, connectDB };
