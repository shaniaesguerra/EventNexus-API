const path = require('path');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const configurePassport = require('../config/passport').configurePassport;
const { ensureOAuthConfigured } = require('../middleware/auth');
const authController = require('../controllers/auth');

const passport = configurePassport();
const router = express.Router();

router.use(
    session({
        secret: process.env.SESSION_SECRET || 'eventnexus-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            sameSite: 'lax',
        },
    })
);

router.use(passport.initialize());
router.use(passport.session());

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
