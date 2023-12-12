import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

/*
album_image,
title,
album,
artist,
genre [string, string],
year,
duration: 1000 = 1sec,
price,

const songDurationInSeconds=song.duration/1000;//50000 -> 50sec -> 00:50 
  const minutes=parseInt(songDurationInSeconds/60).toFixed(0);
  const seconds=parseInt(songDurationInSeconds%60).toFixed(0);
  const songDuration=`${minutes>9?minutes:"0"+minutes}:${seconds>9?seconds:"0"+seconds}`;
*/
export default function SpotifyCard({
  album_image = "https://picsum.photos/200",
  title = "Nana",
  album = "Malibu",
  artist = "Anderson, Paak",
  genre = ["Rap", "Hip-Hop"],
  year = 2016,
  duration = 320000,
  price = "39.49$",
  numOfPurchases = 4,
  numOfComments = 6,
}) {
  const songDurationInSeconds = duration / 1000; //50000 -> 50sec -> 00:50
  const minutes = parseInt(songDurationInSeconds / 60).toFixed(0);
  const seconds = parseInt(songDurationInSeconds % 60).toFixed(0);
  const songDuration = `${minutes > 9 ? minutes : "0" + minutes}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;
  return (
    <Card
      sx={{
        margin: "5rem",
        maxWidth: 285,
        borderRadius: "0.8rem",
        overflow: "hidden",
        backgroundColor: "#1A1A1A",
        transition: "background-color 0.3s, box-shadow 0.3s",
        boxShadow: "0.25rem 0.25rem 0.5rem #2A2A2A",
        "&:hover": {
          backgroundColor: "#2A2A2A",
          boxShadow: "0 0.5rem 1rem #2A2A2A",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={album_image}
          alt="Album Cover"
          sx={
            {
              // objectFit: "contain",
              // maxHeight: "11rem",
              // marginTop: "1rem",
            }
          }
        />
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
          {numOfComments ? numOfComments : 0} Comments
        </Button>
        <Button
          size="small"
          sx={{ color: "#9A9A9A" }}
          startIcon={<CloudDownloadIcon />}
        >
          {numOfPurchases ? numOfPurchases : 0} Downloads
        </Button>
      </CardActions>
    </Card>
  );
}
