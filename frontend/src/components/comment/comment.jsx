import React from "react";
import { Avatar, Typography, Box, Paper, Button } from "@mui/material";

const Comment = ({
  profile_image = "https://picsum.photos/200",
  username = "username",
  comment = "esttesttesttesttesttesttesttsttestt",
  date = "25.10.2023",
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
              {username}
            </Typography>
            <Typography variant="body1">{comment}</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" marginTop={1}>
          <Button size="small" variant="text" color="error" onClick={() => {}}>
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
