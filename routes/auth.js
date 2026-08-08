const express = require('express');
const passport = require('passport');
const { ensureOAuthConfigured } = require('../middleware/auth');
const authController = require('../controllers/auth');

const router = express.Router();

// GitHub authentication route
router.get('/github', ensureOAuthConfigured, passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get(
    '/github/callback',
    ensureOAuthConfigured,
    passport.authenticate('github', { failureRedirect: '/auth/github/failure' }),
    authController.gitHubCallBack
);

// GitHub authentication failure route
router.get('/github/failure', authController.gitHubFailure);

// Authentication status route
router.get('/status', authController.status);

// Logout route
router.post('/logout', authController.logout);

module.exports = router;
