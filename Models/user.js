const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: true,
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
    avatar:{ data: Buffer, contentType: String },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports  = mongoose.model('users', UserSchema);
