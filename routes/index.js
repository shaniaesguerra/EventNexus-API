const router = require('express').Router();

// Import Routes
const eventRoutes = require('./events');
const venueRoutes = require('./venues');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const registrationRoutes = require('./registrations');

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
    + '<p style="color: #666; margin-bottom: 24px;">Sign in with your GitHub account</p>'
    + '<div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 24px;">'
    + '<a href="/auth/github" style="display: inline-flex; align-items: center; gap: 8px; background-color: #24292e; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; cursor: pointer; border: none;">'
    + '<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>'
    + 'Login with GitHub</a>'
    + '</div>'
    + '<a href="/api-docs" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; cursor: pointer; border: none;">SWAGGER Documentation</a>'
    + '</div></body></html>'
  );
});
router.use('/events', eventRoutes);
router.use('/venues', venueRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/registrations', registrationRoutes);

module.exports = router;