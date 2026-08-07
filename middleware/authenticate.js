const authenticate = (req, res, next) => {
    if (typeof req.isAuthenticated === 'function' && req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        error: 'Unauthorized. Please log in.',
    });
};

module.exports = authenticate;
