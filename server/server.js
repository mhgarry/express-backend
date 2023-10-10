const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config;

const PORT = 3700;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('this is a test')
})

app.listen(PORT, () => {
    console.log(`Server connceted on port ${PORT}`);
});
