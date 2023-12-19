import React from "react";
import Song from "../../components/Song/Song";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/loader";
import { Box, Typography } from "@mui/material";
import List from "../../components/list/List";
import Comment from "../../components/comment/Comment";

const SongPage = () => {
  const { id } = useParams();
  const [song, setSong] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = React.useState(true);

  const fetchSong = async () => {
    const { data } = await axios.get(`http://localhost:6969/songs/${id}`);
    // const { data: comments } = await axios.get(
    //   `http://localhost:6969/comments/song/${id}`
    // );
    setSong(data);
    // setComments(comments.comments);
    setIsLoading(false);
    // setIsCommentsLoading(false);
  };
  React.useEffect(() => {
    setIsLoading(true);
    fetchSong();
  }, []);

  const fetchComments = async () => {
    const { data: comments } = await axios.get(
      `http://localhost:6969/comments/song/${id}`
    );
    setComments(comments.comments);
    setIsCommentsLoading(false);
  };

  const removeComment = async (id) => {
    setIsCommentsLoading(true);
    await axios.delete(`http://localhost:6969/comments/${id}`);
    setComments((prev) => prev.filter((comment) => comment._id !== id));
    setIsCommentsLoading(false);
  };

  const editComment = async (id, editedComment) => {
    try {
      console.log("HERE: ", id, editedComment);
      await axios
        .put(`http://localhost:6969/comments/${id}`, {
          comment: editedComment,
        })
        .then((res) => {
          console.log("RES: ", res.data);
          setComments((prev) =>
            prev.map((comment) => {
              if (comment._id === id) {
                return res.data;
              }
              return comment;
            })
          );
        });
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  React.useEffect(() => {
    fetchComments();
  }, [comments]);

  return (
    <Loader isLoading={isLoading}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          marginTop="2rem"
          sx={{ display: "block", justifyContent: "center" }}
        >
          <Box>
            <Song {...song} />
          </Box>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              overflowY: "auto",
              maxHeight: "50vh",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#6A6A6A",
                borderRadius: "4px",
              },
            }}
            marginTop="2rem"
            marginBottom="5rem"
          >
            <Loader isLoading={isCommentsLoading}>
              {comments.length > 0 ? (
                <List
                  list={comments}
                  CardComponent={Comment}
                  flexDirection="column"
                  func={removeComment}
                  testFunc={editComment}
                />
              ) : (
                <Typography variant="h6" textAlign={"center"}>
                  No comments yet
                </Typography>
              )}
            </Loader>
          </Box>
        </Box>
      </Box>
    </Loader>
  );
};

export default SongPage;
