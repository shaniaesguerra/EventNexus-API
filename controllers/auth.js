const gitHubCallBack = (req, res) => {
    res.redirect('/');
};

const gitHubFailure = (req, res) => {
    res.status(401).json({ authenticated: false, error: 'GitHub authentication failed.' });
};

const status = (req, res) => {
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
};

const logout = (req, res, next) => {
    if (typeof req.logout === 'function') {
        req.logout(err => {
            if (err) {
                return next(err);
            }
            req.session.destroy(() => res.json({ success: true }));
        });
    }
    else {
        req.session.destroy(() => res.json({ success: true }));
    }
};

module.exports = {
    gitHubCallBack,
    gitHubFailure,
    status,
    logout,
};