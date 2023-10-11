const { User } = require('../models/User');
const { hashPass } = require('../middleware/hashPassword');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a secret key for JWT
const dev_secret = process.env.JWT_SECRET || require('crypto').randomBytes(256).toString('hex');
process.env.JWT_SECRET = dev_secret;

// User registration post
router.post('/register', async (req, res) => {
    // If email and password are missing or incorrectly inputted, this error message will be shown
    if (!req.body.email || !req.body.password) {
        return res.json({ success: false, error: 'Please enter a valid email and password' });
    }

    try {
        // Await the result of the hashed password from our hash password function
        const password = await hashPass(req, res);

        // Await email and password to create user
        await User.create({
            email: req.body.email,
            password: password,
        });

        const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, message: `New user ${req.body.email} created!`, token });
        console.log('New user created!');
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        return res.status(500).json({ success: false, message: 'Internal server' });
    }
    
});
module.exports = router;
