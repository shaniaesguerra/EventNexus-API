function authenticate(req, res, next) {
    const isAuthenticated =
        typeof req.isAuthenticated === 'function' ? req.isAuthenticated() : Boolean(req.user);

    if (isAuthenticated) {
        return next();
    }

    return res.status(401).json({ error: 'Authentication required.' });
}

module.exports = authenticate;
