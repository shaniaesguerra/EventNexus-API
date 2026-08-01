const router = require('express').Router();

//Import Routes
const eventRoutes = require('./events');
const venueRoutes = require('./venues');

router.get('/', (req, res) => {
  //#swagger.tags=['Welcome!']
    res.send('Welcome to EventNexus API, Explore our best Events!<br>'
        + '1. Events Routes: <strong>/events</strong> <strong>/events/:id</strong><br>'
        + '2. Venues Routes: <strong>/venues</strong> <strong>/venues/:id</strong><br>'
  );
});

router.use('/events', eventRoutes);
router.use('/venues', venueRoutes);

module.exports = router;