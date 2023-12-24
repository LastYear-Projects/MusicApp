import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import io from "socket.io-client";

const socket = io("http://localhost:7070"); // Replace with your server URL

const Chat = ({ isOpen, handleOpen }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("message", newMessage);
      setNewMessage("");
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleOpen}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Typography variant="h6" gutterBottom>
          Chat
        </Typography>
        <List
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </List>
        <div
          style={{
            display: "flex",
            marginTop: (theme) => theme.spacing(2),
          }}
        >
          <TextField
            sx={{
              flexGrow: 1,
              marginRight: (theme) => theme.spacing(2),
            }}
            variant="outlined"
            label="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </Paper>
    </Drawer>
  );
};

export default Chat;
