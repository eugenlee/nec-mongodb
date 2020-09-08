const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) res.status(401).json({ msg: 'No Token, Authorization Denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({ msg: 'Invalid Token' });
    }
}

module.exports = auth;