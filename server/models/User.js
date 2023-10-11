const Mongoose = require('mongoose');


const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: 'user' });

const User = Mongoose.model('User', UserSchema);

module.exports = { User };