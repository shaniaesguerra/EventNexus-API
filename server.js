require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const eventsRouter = require('./routes/events');

//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

//----------- MIDDLEWARE ----------- 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//----------- Swagger UI Route -----------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//----------- API Routes ----------- 
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EventNexus API, Explore our best Events!  ' });
});

app.use('/events', eventsRouter);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
