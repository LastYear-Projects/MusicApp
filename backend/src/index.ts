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
import fileRoutes from "./routes/file.routes";
import commentRoutes from "./routes/comments.routes";
import handleClient from "./utils/sockets";
import { createServer } from "http";
import https from "https";
import fs from "fs";

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3010;

const app = express();
//middleWares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/public", express.static("public")); // to serve static files

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

//routes
app.use("/songs", songRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/uploadFiles", fileRoutes);
app.use("/comments", commentRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


let httpServer;
let socketServer;

function startServers() {
  httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  socketServer = server.listen(SOCKET_PORT, () => {
    console.log(`Socket Server is running on port ${SOCKET_PORT}`);
  });
  // const options = {
  //   key: fs.readFileSync('../../client-key.pem'),
  //   cert: fs.readFileSync('../../client-cert.pem')
  // }
  https.createServer(app).listen(process.env.HTTPS_PORT);
  // https.createServer(options, app).listen(process.env.HTTPS_PORT);
  connectDB();
}

function stopServers() {
  if (httpServer) {
    httpServer.close();
  }
  if (socketServer) {
    socketServer.close();
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServers();
}

export { app, startServers, stopServers };