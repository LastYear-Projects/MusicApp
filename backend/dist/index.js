"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const socketService_1 = require("./utils/socketService");
const sockets_1 = require("./utils/sockets");
const mongo_1 = __importDefault(require("./config/mongo"));
const songs_routes_1 = __importDefault(require("./routes/songs.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3010;
const app = (0, express_1.default)();
// Middlewares
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Socket.io
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // adjust this to your frontend URL in production for security
        methods: ["GET", "POST"],
    },
});
(0, socketService_1.setSocket)(io);
(0, sockets_1.handleClient)(io);
// Using socket communication for the chat.
server.listen(Number(SOCKET_PORT), () => {
    console.log(`Socket Server is running on port ${SOCKET_PORT}`);
});
// Routes
app.use("/songs", songs_routes_1.default);
app.use("/users", users_routes_1.default);
app.use("/orders", orders_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.use("/admin", admin_routes_1.default);
app.use("/comments", comments_routes_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.listen(Number(PORT), () => {
    console.log(`Server is running on port ${PORT}`);
    (0, mongo_1.default)();
});
//# sourceMappingURL=index.js.map