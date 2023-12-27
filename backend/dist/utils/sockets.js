"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClient = void 0;
const xss = __importStar(require("xss"));
const handleClient = (io) => {
    io.on("connection", (socket) => {
        console.log("New WebSocket Connection...");
        // Listen for incoming chat messages
        socket.on("message", (messageObject) => {
            console.log("messageObject: ", messageObject);
            // Sanitize the message before broadcasting
            const sanitizedMessage = xss.escapeHtml(messageObject.message);
            // Broadcast the sanitized message to all connected clients
            io.emit("message", {
                message: sanitizedMessage,
                userDetails: messageObject.userDetails,
            });
        });
        // Listen for incoming song comments
        socket.on("cart", (cartObject) => {
            console.log("cartObject: ", cartObject);
            // Broadcast the sanitized comment to all connected clients
            io.emit("cart", {
                token: cartObject.token,
                cart: cartObject.cart,
                numberInCart: cartObject.numberInCart,
            });
        });
        socket.on("disconnect", () => {
            io.emit("message", "A user has left the chat");
            console.log("Client has closed the socket");
        });
    });
};
exports.handleClient = handleClient;
//# sourceMappingURL=sockets.js.map