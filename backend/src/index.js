if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const connectDB = require("./config/mongo");
const socketio = require("socket.io");
const { setSocket } = require("./utils/socketService");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3010;

const app = express();
//middleWares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//socket.io
const server = require("http").createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*", // adjust this to your frontend URL in production for security
    methods: ["GET", "POST"],
  },
});
setSocket(io);
const { handleClient } = require("./utils/sockets");
handleClient(io);

// using socket comunicatin for the chat.
server.listen(SOCKET_PORT, () => {
  console.log(`Socket Server is running on port ${SOCKET_PORT}`);
});

//routes
app.use("/songs", require("./routes/songs.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/orders", require("./routes/orders.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/admin", require("./routes/admin.routes"));
app.use("/comments", require("./routes/comments.routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

module.exports = app;
