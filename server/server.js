const express = require('express');
const cors = require('cors');
const dbConnect = require('./db/connection');
const app = express();

require('dotenv').config;

const PORT = process.env.PORT || 3700;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json('this is a test')
})

dbConnect.once('open', () => { 
    app.listen(PORT, () => {
      console.log(`Server is up and running on Port: http://localhost:${PORT}`);
    });
  });