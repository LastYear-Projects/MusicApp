import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import { createServer } from "http";
import socketio, { Server as SocketIOServer } from "socket.io";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { setSocket } from "./utils/socketService";
import { handleClient } from "./utils/sockets";
import connectDB from "./config/mongo";

dotenv.config();

const PORT: number | string = process.env.PORT || 5000;
const SOCKET_PORT: number | string = process.env.SOCKET_PORT || 3010;

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Socket.io
const server = createServer(app);
const io: SocketIOServer = socketio(server, {
  cors: {
    origin: "*", // adjust this to your frontend URL in production for security
    methods: ["GET", "POST"],
  },
});
setSocket(io);
handleClient(io);

// Using socket communication for the chat.
server.listen(Number(SOCKET_PORT), () => {
  console.log(`Socket Server is running on port ${SOCKET_PORT}`);
});

// Routes
app.use("/songs", require("./routes/songs.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/orders", require("./routes/orders.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/admin", require("./routes/admin.routes"));
app.use("/comments", require("./routes/comments.routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(Number(PORT), () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
