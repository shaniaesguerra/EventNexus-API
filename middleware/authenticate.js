const authenticate = (req, res, next) => {
    //Allow all requests during Jest testing
    if (process.env.NODE_ENV === 'test') {
        req.user = { _id: 'test-user-id' }; // Mock user object
        return next();
    }

    if (typeof req.isAuthenticated === 'function' && req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        error: 'Unauthorized. Please log in.',
    });
};

module.exports = authenticate;
