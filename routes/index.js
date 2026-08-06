const router = require('express').Router();

// Import Routes
const eventRoutes = require('./events');
const venueRoutes = require('./venues');
const authRoutes = require('./auth');

router.get('/', (req, res) => {
  res.send(
    '<div style="font-family:Arial,sans-serif;line-height:1.6;max-width:700px;margin:2rem auto;padding:1rem;">'
    + '<h1>Welcome to EventNexus API</h1>'
    + '<p>Explore our best Events!</p>'
    + '<ul>'
    + '<li>API Documentation: <strong>/api-docs</strong></li>'
    + '<li>Events Routes: <strong>/events</strong> <strong>/events/:id</strong></li>'
    + '<li>Venues Routes: <strong>/venues</strong> <strong>/venues/:id</strong></li>'
    + '</ul>'
    + '</div>'
  );
});

router.use('/events', eventRoutes);
router.use('/venues', venueRoutes);
router.use('/auth', authRoutes);

module.exports = router;