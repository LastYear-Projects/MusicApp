import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import  { Server as SocketIOServer } from "socket.io";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { setSocket } from "./utils/socketService";
import { handleClient } from "./utils/sockets";
import connectDB from "./config/mongo";
import { Server as HTTPServer } from "http";

import SongRoutes from "./routes/songs.routes"
import UserRoutes from "./routes/users.routes"
import OrderRoutes from "./routes/orders.routes"
import AuthRoutes from "./routes/auth.routes"
import AdminRoutes from "./routes/admin.routes"
import CommentRoutes from "./routes/comments.routes"


dotenv.config();

const PORT: number | string = process.env.PORT || 5000;
const SOCKET_PORT: number | string = process.env.SOCKET_PORT || 3010;

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Socket.io
const server: HTTPServer = createServer(app);
const io: SocketIOServer = new SocketIOServer(server, {
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
app.use("/songs", SongRoutes);
app.use("/users", UserRoutes);
app.use("/orders",OrderRoutes);
app.use("/auth", AuthRoutes);
app.use("/admin", AdminRoutes);
app.use("/comments", CommentRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(Number(PORT), () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
