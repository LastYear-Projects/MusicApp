import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

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
      <CardActions>
        <Button size="small" color="success">
          Commands: 15
        </Button>
        <Button size="small" color="primary">
          Dowloanded: 7
        </Button>
      </CardActions>
    </Card>
  );
}
