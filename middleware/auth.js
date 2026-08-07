function ensureOAuthConfigured(req, res, next){
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
     if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
        return res.status(500).json({ error: 'GitHub OAuth is not configured.' });
    }
    next();
}

module.exports = { ensureOAuthConfigured };