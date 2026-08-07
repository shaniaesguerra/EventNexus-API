const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const configurePassport = () => {
    const {
        GITHUB_CLIENT_ID,
            GITHUB_CLIENT_SECRET,
            SESSION_SECRET = 'eventnexus-secret',
    } = process.env;

    const callbackURL = process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback';
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

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
    
    return passport;
}

module.exports = { configurePassport };