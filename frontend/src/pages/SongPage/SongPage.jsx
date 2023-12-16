import React from "react";
import Song from "../../components/Song/Song";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/loader";
import { Box, Typography } from "@mui/material";
import Comment from "../../components/comment/Comment";
import List from "../../components/list/List";

const SongPage = () => {
  const { id } = useParams();
  const [song, setSong] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchSong = async () => {
    const { data } = await axios.get(`http://localhost:6969/songs/${id}`);
    setSong(data);
    setComments(data.comments);
    setIsLoading(false);
  };
  React.useEffect(() => {
    fetchSong();
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
            {comments.length > 0 ? (
              <List {...comments} />
            ) : (
              <Typography variant="h6" textAlign={"center"}>
                No comments yet
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Loader>
  );
};

export default SongPage;
