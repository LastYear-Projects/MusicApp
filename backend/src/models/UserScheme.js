const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 500
    },
    // _id: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3,
    //     maxlength: 50,
    //     unique: true
    // },
    isAdmin: {
        type: Boolean,
        default: false
    },
    songs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'song',
        default: []
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'order',
        default: []
    }
});

module.exports = mongoose.model('user', UserScheme, 'users')