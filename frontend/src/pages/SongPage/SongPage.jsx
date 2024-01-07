import React from "react";
import Song from "../../components/Song/Song";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/loader.tsx";
import { Box, Typography } from "@mui/material";
import List from "../../components/list/List.tsx";
import Comment from "../../components/comment/Comment.tsx";
import { Button, Form } from "antd";

const SongPage = () => {
  const { id } = useParams();
  const [song, setSong] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = React.useState(true);
  const [newComment, setNewComment] = React.useState("");
  const userToken = localStorage.getItem("moozikaToken");

  const fetchSong = async () => {
    try {
      const { data } = await axios.get(`http://localhost:6969/songs/${id}`);
      setSong(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching song:", error);
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data: fetchedComments } = await axios.get(
        `http://localhost:6969/comments/song/${id}`
      );
      setComments(fetchedComments.comments);
      setIsCommentsLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setIsCommentsLoading(false);
    }
  };

  const removeComment = async (id) => {
    setIsCommentsLoading(true);
    try {
      await axios.delete(`http://localhost:6969/comments/${id}`);
      setComments((prev) => prev.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error("Error removing comment:", error);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const editComment = async (id, editedComment) => {
    try {
      setIsCommentsLoading(true);
      const { data } = await axios.put(`http://localhost:6969/comments/${id}`, {
        comment: editedComment,
      });

      setComments((prev) =>
        prev.map((comment) => (comment._id === id ? data : comment))
      );

      fetchComments();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchSong();
    fetchComments();
  }, []);

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
                  creator={song.creator}
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
              {userToken && (
                <Form style={{ marginTop: "1rem" }}>
                  <Form.Item>
                    <textarea
                      placeholder="Add a comment..."
                      style={{
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "1rem",
                        resize: "none",
                        height: "100px",
                        outline: "none",
                      }}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </Form.Item>
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <Form.Item>
                      <Button
                        textAlign={"center"}
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                          setIsCommentsLoading(true);
                          axios
                            .post("http://localhost:6969/comments/", {
                              token: userToken,
                              comment: newComment,
                              songId: id,
                            })
                            .then(() => {
                              fetchComments();
                              setNewComment("");
                            })
                            .catch((err) => {})
                            .finally(() => setIsCommentsLoading(false));
                        }}
                      >
                        Add Comment
                      </Button>
                    </Form.Item>
                  </Box>
                </Form>
              )}
            </Loader>
          </Box>
        </Box>
      </Box>
    </Loader>
  );
};

export default SongPage;
