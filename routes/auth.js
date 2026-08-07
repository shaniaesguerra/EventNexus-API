const path = require('path');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const router = express.Router();

const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
} = process.env;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || process.env.CALLBACK_URL;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

const callbackURL = GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback';

if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
    passport.use(
        new GitHubStrategy(
            {
                clientID: GITHUB_CLIENT_ID,
                clientSecret: GITHUB_CLIENT_SECRET,
                callbackURL,
            },
            (accessToken, refreshToken, profile, done) => done(null, profile)
        )
    );
}

function ensureOAuthConfigured(req, res, next) {
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
        return res.status(500).json({ error: 'GitHub OAuth is not configured.' });
    }
    next();
}

router.get('/github', ensureOAuthConfigured, passport.authenticate('github', { scope: ['user:email'] }));

router.get(
    '/github/callback',
    ensureOAuthConfigured,
    passport.authenticate('github', { failureRedirect: '/auth/github/failure', session: true }),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/github/failure', (req, res) => {
    res.status(401).json({ authenticated: false, error: 'GitHub authentication failed' });
});

router.get('/status', (req, res) => {
    const authenticated = typeof req.isAuthenticated === 'function' ? req.isAuthenticated() : false;
    const user = req.user
        ? {
            id: req.user.id || req.user.username,
            username: req.user.username,
            displayName: req.user.displayName,
            avatar: req.user.photos?.[0]?.value,
        }
        : null;

    res.json({ authenticated, user });
});

router.post('/logout', (req, res, next) => {
    if (typeof req.logout === 'function') {
        req.logout(err => {
            if (err) {
                return next(err);
            }
            req.session.destroy(() => res.json({ success: true }));
        });
    } else {
        req.session.destroy(() => res.json({ success: true }));
    }
});

module.exports = router;
