const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true,
        minlength: 11
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    files: {
        type: String,
        require: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);
