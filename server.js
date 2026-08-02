const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const fs = require('fs'); //filestream, replaces 'body-parser'
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', true);

// built-in body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({ origin: '*' }));

// simple logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// app routes
app.use('/', require('./routes'));

// dynamic swagger spec so UI uses current protocol/host
app.get('/swagger.json', async (req, res) => {
  try {
    const raw = await fs.promises.readFile(path.join(__dirname, 'swagger', 'swagger.json'), 'utf8');
    const doc = JSON.parse(raw);

    if (doc.openapi) {
      doc.servers = [{ url: `${req.protocol}://${req.get('host')}` }];
    } else if (doc.swagger === '2.0') {
      doc.host = req.get('host');
      doc.schemes = [req.protocol];
      doc.basePath = doc.basePath || '/';
    }

    res.json(doc);
  } catch (error) {
    console.error('Failed to load swagger.json', error);
    res.status(500).json({ error: 'Unable to load swagger spec' });
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerUrl: '/swagger.json' }));

const startServer = async () => {
  const connected = await connectDB();

  if (!connected) {
    console.error('Failed to connect to MongoDB. Server will not start.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}
