const { Users } = require('../models/User');
const { hashPass } = require('../middleware/hashPassword');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config;
// create a secret key for our JWT
const secret = require('crypto').randomBytes(256).toString('hex');
process.env.JWT_SECRET = secret;
//user registration post
router.post('/register', async(req, res) => {
    //if email and password are missing or incorrectly inputted this error message will be shown
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token: token });
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, error: 'Please enter a valid email and password'});
    }
    try {
        // await the result of the hashed password from our hash password function
        const password = await hashPass(req, res);
        // await email and password to create user
        await Users.create({
            email: req.body.email,
            password: password, 
        })
        res.status(200).json({ success: true,  message: `New user ${req.body.email} created!`}, token);
        console.log('New user created!')
    } catch(err) {
        res.status(500)
    }
});

module.exports = router;