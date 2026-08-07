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



module.exports = router;
