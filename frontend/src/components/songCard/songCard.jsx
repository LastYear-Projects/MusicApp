import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
import AddSong from "../addSongModal/addSong.jsx";
import EditSongModal from "../modal/editSongModal.jsx";
import { handleRequestWithToken } from "../../utils/index.js";

export default function SongCard({
  _id,
  album_image,
  title,
  album,
  artist,
  genre,
  year,
  duration,
  price,
  numOfPurchases,
  comments,
  creator,
}) {
  const songDurationInSeconds = duration / 1000;
  const minutes = parseInt(songDurationInSeconds / 60).toFixed(0);
  const seconds = parseInt(songDurationInSeconds % 60).toFixed(0);
  const songDuration = `${minutes > 9 ? minutes : "0" + minutes}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;
  const numOfComments = comments ? comments.length : 0;
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [isOwnedByUser, setIsOwnedByUser] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editedSong, setEditedSong] = React.useState({}); // State to store edited song details

  const handleDeleteSong = async () => {
    try {
      const userToken = localStorage.getItem("moozikaToken");
      if (!handleRequestWithToken()) return navigate("/");
      await axios.delete(`http://localhost:6969/songs/${_id}`, {
        token: userToken,
      });
    } catch (err) {}
  };

  const isSongOwnedByUserCheck = async () => {
    if (!handleRequestWithToken()) return navigate("/");
    const { data } = await axios.post(
      "http://localhost:6969/users/user-details",
      { token: localStorage.getItem("moozikaToken") }
    );
    if (creator === data._id) {
      setIsOwnedByUser(true);
      return;
    }
    setIsOwnedByUser(false);
  };

  const handleEditSong = () => {
    setOpenEditModal(true);
    setEditedSong({
      title,
      album,
      album_image,
      artist,
      genre,
      year,
      duration,
      price,
    });
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <Card
      sx={{
        // margin: "5rem",
        maxWidth: 295,
        borderRadius: "0.8rem",
        overflow: "hidden",
        backgroundColor: "#1A1A1A",
        transition: "background-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          backgroundColor: "#2A2A2A",
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/song/${_id}`)}>
        <CardMedia component="img" image={album_image} alt="Album Cover" />
        <CardContent>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "0.5rem",
              color: "white",
            }}
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "#9A9A9A",
              fontWeight: 200,
              fontSize: "1rem",
              marginBottom: "0.2rem",
            }}
            variant="body2"
            color="text.secondary"
          >
            {album}
          </Typography>
          <Typography
            sx={{
              color: "#9A9A9A",
              fontWeight: 200,
              fontSize: "1rem",
              marginBottom: "0.2rem",
            }}
            variant="body2"
            color="text.secondary"
          >
            {artist}
          </Typography>
          <Typography
            sx={{
              color: "#9A9A9A",
              fontWeight: 200,
              fontSize: "1rem",
              marginBottom: "0.2rem",
            }}
            variant="body2"
            color="text.secondary"
          >
            {genre.join(", ")}
          </Typography>
          <Typography
            sx={{
              color: "#9A9A9A",
              fontWeight: 200,
              fontSize: "1rem",
              marginBottom: "0.2rem",
            }}
            variant="body2"
            color="text.secondary"
          >
            {year}
          </Typography>
          <Typography
            sx={{ color: "#9A9A9A", fontWeight: 200, fontSize: "1rem" }}
            variant="body2"
            color="text.secondary"
          >
            {songDuration}
          </Typography>
          <Typography
            sx={{ color: "#9A9A9A", fontWeight: 200, fontSize: "1rem" }}
            variant="body2"
            color="text.secondary"
          >
            Price: {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderTop: "1px solid #eee",
        }}
      >
        <Button
          size="small"
          sx={{ color: "#9A9A9A" }}
          startIcon={<CommentIcon />}
        >
          {numOfComments} Comments
        </Button>
        <Button
          size="small"
          sx={{ color: "#9A9A9A" }}
          startIcon={<CloudDownloadIcon />}
        >
          {numOfPurchases ? numOfPurchases : 0} Purchases
        </Button>
      </CardActions>
      {pathname === "/profile" && isSongOwnedByUserCheck() && isOwnedByUser && (
        <Box
          margin="0.5rem"
          textAlign={"center"}
          border={0.5}
          borderRadius={5}
          p={0.5}
          borderColor="grey.500"
        >
          <Button
            onClick={handleDeleteSong}
            size="small"
            sx={{ color: "Red" }}
            textAlign="center"
            startIcon={<Delete />}
          >
            Delete This Song
          </Button>
        </Box>
      )}
      {pathname === "/profile" && isOwnedByUser && (
        <Box
          margin="0.5rem"
          textAlign={"center"}
          border={0.5}
          borderRadius={5}
          p={0.5}
          borderColor="grey.500"
        >
          <Button
            onClick={handleEditSong}
            size="small"
            sx={{ color: "Green", marginLeft: 1 }}
            startIcon={<Edit />}
          >
            Edit This Song
          </Button>
        </Box>
      )}

      <EditSongModal
        open={openEditModal} // open the modal
        onClose={handleCloseEditModal}
        songDetails={editedSong}
        songId={_id}
        creator={creator}
      />
    </Card>
  );
}
