const xss = require("xss");

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

    socket.on("disconnect", () => {
      io.emit("message", "A user has left the chat");
      console.log("Client has closed the socket");
    });
  });
};

module.exports = { handleClient };
