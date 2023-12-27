import mongoose, { ConnectOptions } from "mongoose";

interface MyConnectOptions extends ConnectOptions {
    useUnifiedTopology?: boolean;
}

const connectDB = async (): Promise<void> => {
    try {
        const options: MyConnectOptions = {
            useUnifiedTopology: true,
        };

        await mongoose.connect(process.env.MONGO_CONNECT as string, options);
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected');
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;
