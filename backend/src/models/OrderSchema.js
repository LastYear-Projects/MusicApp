const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    songs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song',
        required: true

        },
    ],
    date: {
        type: Date,
        default: function() {

            const now = new Date();
            now.setHours(now.getHours() + 3);
            return now;
          }
    }
});

module.exports = mongoose.model('order', OrderSchema, 'orders')