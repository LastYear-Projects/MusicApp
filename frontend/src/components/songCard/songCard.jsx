import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/200"
          alt="green iguana"
        />
        <CardContent>
          <Typography
            sx={{ fontWeight: "bold" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            Lizard
          </Typography>
          <Typography
            sx={{ color: "#6A6A6A", fontWeight: 200 }}
            variant="body2"
            color="text.secondary"
          >
            Malibu
          </Typography>
          <Typography
            sx={{ color: "#6A6A6A", fontWeight: 200 }}
            variant="body2"
            color="text.secondary"
          >
            Anderson, Paak
          </Typography>
          <Typography
            sx={{ color: "#6A6A6A", fontWeight: 200 }}
            variant="body2"
            color="text.secondary"
          >
            Rap, Hip-Hop
          </Typography>
          <Typography
            sx={{ color: "#6A6A6A", fontWeight: 200 }}
            variant="body2"
            color="text.secondary"
          >
            2016
          </Typography>
          <Typography
            sx={{ color: "#6A6A6A", fontWeight: 200 }}
            variant="body2"
            color="text.secondary"
          >
            5:29
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#6A6A6A",
            fontWeight: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CommentIcon sx={{ color: "#6A6A6A" }} /> 15
        </Typography>
        <Typography
          sx={{
            color: "#6A6A6A",
            fontWeight: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CloudDownloadIcon sx={{ color: "#6A6A6A" }} />7
        </Typography>
      </CardActions>
    </Card>
  );
}
