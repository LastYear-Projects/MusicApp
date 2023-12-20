import React from "react";
import {
  Avatar,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const Comment = ({
  comment,
  date,
  _id,
  func: removeComment,
  editFunc: editComment,
  user: { name, profile_image },
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedComment, setEditedComment] = React.useState(comment);

  const validateUser = async () => {
    console.log("Hereeee");
    const userToken = localStorage.getItem("userToken");
    console.log(userToken);
    const { data } = await axios.get(
      `http://localhost:6969/users/user-details/`,
      userToken
    );
    console.log("data0", data);

    // if (data.user_id === userToken.id) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  React.useEffect(() => {
    validateUser();
  }, []);

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

            {isEditing ? (
              <TextField
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{comment}</Typography>
            )}
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
          {isEditing ? (
            <Button
              size="small"
              variant="text"
              color="primary"
              onClick={() => {
                editComment(_id, editedComment);
                setIsEditing(false);
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              size="small"
              variant="text"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
          <Typography variant="caption" color="textSecondary" marginLeft="auto">
            {date}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Comment;
