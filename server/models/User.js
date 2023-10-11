const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: 'users' });

const Users = mongoose.model('User', UserSchema);

module.exports = { Users };