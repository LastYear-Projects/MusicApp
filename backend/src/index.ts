import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/mongo";
import  { Server } from "socket.io";
import Socket  from "./utils/socketService";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import songRoutes from "./routes/songs.routes";
import userRoutes from "./routes/users.routes";
import orderRoutes from "./routes/orders.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import commentRoutes from "./routes/comments.routes";
import chatRoutes from "./routes/chats.routes";
import handleClient from "./utils/sockets";
import { createServer } from "http";

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3010;

const app = express();
//middleWares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//socket.io

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});
Socket.setSocket(io); 
handleClient(io); 

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
app.use("/chats", chatRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
