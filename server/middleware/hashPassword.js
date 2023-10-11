const { User } = require("../models/User");
const bcrypt = require("bcryptjs");

//hashes passwords using bcrypt library to store in our database
const hashPass = async (req, res) => {
  try {
    const password = await req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

module.exports = { hashPass };
