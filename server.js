require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const eventsRouter = require('./routes/events');
const venuesRouter = require('./routes/venues');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EventNexus API, Explore our best Events!  ' });
});

app.use('/events', eventsRouter);
app.use('/venues', venuesRouter);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
