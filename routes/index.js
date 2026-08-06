const router = require('express').Router();

//Import Routes
const eventRoutes = require('./events');
const venueRoutes = require('./venues');
const userRoutes = require('./users');

router.get('/', (req, res) => {
  res.send(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
    + '<title>Event Nexus API</title></head>'
    + '<body style="margin: 0; font-family: Arial, Helvetica, sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; min-height: 100vh;">'
    + '<div style="background: #ffffff; padding: 48px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; max-width: 640px;">'
    + '<h1 style="margin-top: 0; color: #333;">Welcome to EventNexus API</h1>'
    + '<p style="color: #666;">Explore our best Events!</p>'
    + '<p style="text-align: left; color: #444; line-height: 1.8;">'
    + '1. API Documentation: <strong>/api-docs</strong><br>'
    + '2. Events Routes: <strong>/events</strong> <strong>/events/:id</strong><br>'
    + '3. Venues Routes: <strong>/venues</strong> <strong>/venues/:id</strong><br>'
    + '4. Users Routes: <strong>/users</strong> <strong>/users/:id</strong><br>'
    + '</p>'
    + '<a href="/api-docs" style="display: inline-block; background-color: #4CAF50; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold; cursor: pointer; border: none; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">Click to View SWAGGER Documentation</a>'
    + '</div></body></html>'
  );
});
router.get('/login', (req, res) => {
  res.send(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
    + '<title>Login - Event Nexus API</title></head>'
    + '<body style="margin: 0; font-family: Arial, Helvetica, sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh;">'
    + '<div style="background: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center;">'
    + '<h1 style="margin-top: 0; color: #333;">Event Nexus API</h1>'
    + '<p style="color: #666; margin-bottom: 24px;">Click to access the SWAGGGER Documentation</p>'
    + '<a href="/api-docs" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; cursor: pointer; border: none;">Login</a>'
    + '</div></body></html>'
  );
});
router.use('/events', eventRoutes);
router.use('/venues', venueRoutes);
router.use('/users', userRoutes);

module.exports = router;