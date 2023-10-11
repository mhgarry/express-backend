const express = require('express');
const cors = require('cors');
const dbConnect = require('./db/connection');

const app = express();
app.use(express.json());
app.use(cors());  
require('dotenv').config;

const PORT = process.env.PORT || 3700;

// routes for registration and authentication 
const router = require('./routes/userRoutes');
app.use(router); // Use the router middleware

// connect to server and open db for server to use
dbConnect.once('open', () => { 
    app.listen(PORT, () => {
      console.log(`Server is up and running on Port: http://localhost:${PORT}`);
    });
  });
