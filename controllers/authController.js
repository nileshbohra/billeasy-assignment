const bcrypt = require('bcrypt');
const User = require('../db/models/users');
const { generateToken } = require('../support/auth/generateAuthToken');
const saltRounds = 10;

exports.signup = (req, res) => {
    const { email, password } = req.body;
    let role = 'user';
    if (!!req.body.role) {
        role = req.body.role;
    }

    // Check if user already exists
    User.findOne({ where: { email } }).then(user => {
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
    }).catch(err => {
        res.status(500).json({ message: 'Error checking user existence' });
    });

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }
        User.create({ email, password: hash, role })
            .then(user => {
                res.status(201).json({ message: 'User created successfully' });
            })
            .catch(err => {
                res.status(500).json({ message: 'Error creating user' });
            });
    });
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'User Not Found' });
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                const userPayload = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                };
                const token = generateToken({ user: userPayload });
                res.cookie('token', token, { httpOnly: true, secure: true })
                res.status(200).json({ message: 'Login successful' });
            });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error logging in' });
        });
}