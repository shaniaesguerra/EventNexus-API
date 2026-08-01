require('dotenv').config({ path: require('path').resolve(__dirname, 'utilities/.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const eventsRouter = require('./routes/events');
const venuesRouter = require('./routes/venues');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Top-level redirect middleware to catch case-variant Swagger paths early
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

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EventNexus API, Explore our best Events!' });
 });

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Middleware: catch common Swagger UI path variants (case-insensitive) and redirect to canonical `/api-docs`
app.use((req, res, next) => {
  try {
    const p = req.path || '';
    // matches /api-doc, /Api-docs, /API-DOCS/, /api-docs/anything
    if (/^\/api-?docs?(\/.*)?$/i.test(p)) {
      if (p.toLowerCase() === '/api-docs' || p.toLowerCase().startsWith('/api-docs/')) {
        return next();
      }
      return res.redirect(301, '/api-docs');
    }
  } catch (e) {
    // ignore and continue
  }
  return next();
});

app.use('/events', eventsRouter);
app.use('/venues', venuesRouter);
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

startServer();
