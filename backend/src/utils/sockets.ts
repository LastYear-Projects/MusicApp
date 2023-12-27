import * as xss from "xss";
import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import { IUser } from "../models/UserScheme";

export type ICart = {
  token: string;
  cart: mongoose.Types.ObjectId[];
  numberInCart: number;
};

const handleClient = (io: Server): void => {
  io.on("connection", (socket: Socket) => {
    console.log("New WebSocket Connection...");

    // Listen for incoming chat messages
    socket.on("message", (messageObject: { message: string; userDetails: IUser }) => {
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
    socket.on("cart", (cartObject: { token: string; cart: ICart[]; numberInCart: number }) => {
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

export { handleClient };
