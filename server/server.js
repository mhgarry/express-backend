const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/connection");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
}; // set my cors options to allow my client to connect to my server
app.use(cors(corsOptions));
require("dotenv").config;

const PORT = process.env.PORT || 3700;

// routes for registration and authentication
const router = require("./routes/userRoutes");
app.use('/api', router); // Use the router middleware

// connect to server and open db for server to use
dbConnect.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on Port: http://localhost:${PORT}`);
  });
});
