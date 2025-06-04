require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    let token = req.headers.cookie;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    token = token.split('=')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded.user;
        next();
    })
}