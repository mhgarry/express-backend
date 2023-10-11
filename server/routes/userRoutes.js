const { User } = require("../models/User");
const { hashPass } = require("../middleware/hashPassword");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Create a secret key for JWT
const dev_secret =
  process.env.JWT_SECRET || require("crypto").randomBytes(256).toString("hex");
process.env.JWT_SECRET = dev_secret;

// User registration post
router.post("/register", async (req, res) => {
  // If email and password are missing or incorrectly inputted, this error message will be shown
  if (!req.body.email || !req.body.password) {
    return res.json({
      success: false,
      error: "Please enter a valid email and password",
    });
  }

  try {
    // Await the result of the hashed password from our hash password function
    const password = await hashPass(req, res);

    // Await email and password to create user
    await User.create({
      email: req.body.email,
      password: password,
    });

  

    res.status(200).json({
      success: true,
      message: `New user ${req.body.email} created!`,
      token,
    });
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("New user created!");
  } catch (err) {
    console.error("Error creating new user:", err.message)
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    return res.status(500).json({ success: false, message: "Internal server" });
  }
});

// User login post route
// User login post route
router.post("/login", async (req, res) => {
    // if email or password are missing or incorrectly inputted, this error message will be shown
    if (!req.body.email || !req.body.password) {
      return res.json({
        success: false,
        error: "Please enter a valid email and password",
      });
    }
  
    try {
      // find user by email
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Incorrect email or password",
        });
      }
  
      // compare hashed passwords
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // passwords match, generate and send token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({ success: true, message: "User logged in", token });
      } else {
        // passwords don't match
        res.status(401).json({
          success: false,
          error: "Incorrect email or password",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  });
  
module.exports = router;
