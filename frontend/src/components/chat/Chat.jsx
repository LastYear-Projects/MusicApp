import React, { useState, useEffect, useRef } from "react";
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
import axios from "axios";

const socket = io("http://localhost:7070"); // Replace with your server URL

const Chat = ({ isOpen, handleOpen }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:6969/users/user-details",
          { token: localStorage.getItem("moozikaToken") }
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();

    // Listen for messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageObject = {
        message: newMessage,
        userDetails: userDetails,
      };
      socket.emit("message", messageObject);
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
          maxWidth: "23rem",
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
              {message.userDetails && message.userDetails.profile_image && (
                <img
                  src={message.userDetails.profile_image}
                  alt="User Avatar"
                  style={{
                    marginRight: "8px",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                  }}
                />
              )}
              {message.userDetails && message.userDetails.name && (
                <ListItemText
                  primary={message.userDetails.name}
                  secondary={message.message}
                />
              )}
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
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
