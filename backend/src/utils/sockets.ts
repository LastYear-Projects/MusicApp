import xss from "xss";

const handleClient = (io) => { //WHAT IS THE TYPE FOR IO ????????
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

export default { handleClient };
