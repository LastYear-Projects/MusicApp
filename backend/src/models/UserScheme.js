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
    songs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'song',
        default: []
    },
    
    profile_image: {
        type: String,
        trim: true,
        default: 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'
    },
});

module.exports = mongoose.model('user', UserScheme, 'users')