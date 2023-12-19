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
    try {
      setIsLoading(true);
      const { data } = await axios.get(`http://localhost:6969/songs/${id}`);
      setSong(data);
    } catch (error) {
      console.error("Error fetching song:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setIsCommentsLoading(true);
      const { data } = await axios.get(
        `http://localhost:6969/comments/song/${id}`
      );
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const removeComment = async (commentId) => {
    try {
      setIsCommentsLoading(true);
      await axios.delete(`http://localhost:6969/comments/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error removing comment:", error);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const editComment = async (commentId, editedComment) => {
    try {
      setIsCommentsLoading(true);
      const { data } = await axios.put(
        `http://localhost:6969/comments/${commentId}`,
        {
          comment: editedComment,
        }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? data : comment
        )
      );
    } catch (error) {
      console.error("Error editing comment:", error);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSong();
  }, [id]);

  React.useEffect(() => {
    fetchComments();
  }, [id]); // Include id in the dependency array

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
