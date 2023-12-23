const mongoose = require('mongoose');

const CommentScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    date: {
        type: Date,
        default: function() {
            const now = new Date();
            now.setHours(now.getHours() + 3);
            return now;
          }
    }
});

module.exports = mongoose.model('comment', CommentScheme, 'comments')