const express = require('express');
const cors = require('cors');
const dbConnect = require('./db/connection');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());  
require('dotenv').config;

const PORT = process.env.PORT || 3700;


// to use our express user routes
const router = require('./routes/userRoutes');
// test route
app.get('/', (req, res) => {
    res.json('this is a test');
});

app.use(router); // Use the router middleware

// connect to server and open db for server to use
dbConnect.once('open', () => { 
    app.listen(PORT, () => {
      console.log(`Server is up and running on Port: http://localhost:${PORT}`);
    });
  });
