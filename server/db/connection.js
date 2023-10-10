const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1/backenddb';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });

module.exports = mongoose.connection;
