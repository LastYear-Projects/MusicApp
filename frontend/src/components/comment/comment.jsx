import React from "react";
import { Avatar, Typography, Box, Paper, Button } from "@mui/material";
import axios from "axios";

const Comment = ({
  comment = "Test Comment",
  date = "00.00.0000",
  _id = "0",
  func: removeComment,
  user: { name = "name", profile_image = "https://picsum.photos/200" },
}) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: "10px",
        marginBottom: "10px",
        wordBreak: "break-all",
        width: "100%",
        maxWidth: "40rem",
        minWidth: "10rem",
      }}
    >
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Avatar src={profile_image} alt="Avatar" />
          <Box marginLeft="1rem">
            <Typography variant="subtitle1" fontWeight="bold">
              {name}
            </Typography>
            <Typography variant="body1">{comment}</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" marginTop={1}>
          <Button
            size="small"
            variant="text"
            color="error"
            onClick={() => removeComment(_id)}
          >
            Remove
          </Button>
          <Typography variant="caption" color="textSecondary" marginLeft="auto">
            {date}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Comment;
