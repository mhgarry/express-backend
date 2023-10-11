const { Users } = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config;
 process.env.JWT_SECRET = require('crypto').randomBytes(256).toString('hex');
//hashes passwords using bcrypt library to store in our database
const hashPass = async (req, res) => {
    try {
        const password = await req.body.password;
        const hashedPassword = bcrypt.hashSync(password, 10);
        res.json({ succes: true, password: hashedPassword });
        return password;
    } catch (err) {
        res.json({ success: false, error:err });
    };
};

module.exports = { hashPass };
