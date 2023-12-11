const mongoose = require('mongoose');

const connectDB =  () => {
    try {
        mongoose.connect(process.env.MONGO_CONNECT, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected');
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;