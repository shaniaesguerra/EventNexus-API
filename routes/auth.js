const path = require('path');
const express = require('express');
const session = require('express-session');

const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const router = express.Router();



router.use(
    session({
        secret: SESSION_SECRET,
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
