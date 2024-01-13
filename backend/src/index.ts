import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import connectDB from "./config/mongo";
import socketio from "socket.io";
import setSocket from "./utils/socketService"; // Fix: Change named import to default import
import swaggerUi from "swagger-ui-express";
import swaggerSpec from"./swagger";
import songRoutes from "./routes/songs.routes";
import userRoutes from "./routes/users.routes";
import orderRoutes from "./routes/orders.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import commentRoutes from "./routes/comments.routes";







const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3010;

const app = express();
//middleWares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//socket.io
import server from "http" // 25 and 26 were one line using require, changed to import
server.createServer(app);
const io = socketio(server, { // WHAT TO DO WITH THIS SOCKETIO
  cors: {
    origin: "*", // adjust this to your frontend URL in production for security
    methods: ["GET", "POST"],
  },
});
setSocket(io); // WHAT TO DO WITH THIS SETSOCKET
import handleClient from "./utils/sockets";
handleClient(io); // WHAT TO DO WITH HANDLECLIENT

// using socket comunicatin for the chat.
server.listen(SOCKET_PORT, () => {
  console.log(`Socket Server is running on port ${SOCKET_PORT}`);
});

//routes
app.use("/songs", songRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/comments", commentRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
