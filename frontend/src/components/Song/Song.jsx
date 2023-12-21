import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function addToCartHandler() {
  alert("Added to cart");
  // Implement logic to add the song to the cart
}

function Song({
  title,
  artist,
  album,
  genere,
  year,
  duration,
  price,
  album_image,
}) {
  return (
    <Box
    //   sx={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // height: '80vh',
    //   }}
    >
      <Card
        sx={{
          display: "flex",
          backgroundColor: "#1A1A1A",
          // width: "90%",
          maxWidth: "800px",
          height: "auto",
          borderRadius: "20px",
          flexDirection: "column", // Default direction
          "@media (min-width:600px)": {
            flexDirection: "row", // Change direction on larger screens
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            objectFit: "cover",
            borderRadius: "20px 20px 0 0",
            "@media (min-width:600px)": {
              width: "50%",
              borderRadius: "20px 0 0 20px",
            },
          }}
          image={album_image}
          alt="Album Cover"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            flex: "1 0 auto",
            justifyContent: "center",
            textAlign: "center",
            "@media (min-width:600px)": {
              justifyContent: "flex-start",
              textAlign: "left",
            },
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="h5"
              color="#d6d6d6"
              marginTop="10px"
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="#b8b8b8"
              component="div"
              marginTop="20px"
            >
              {artist}
            </Typography>
            <Typography variant="subtitle1" color="#b8b8b8" component="div">
              {genere}
            </Typography>
            <Typography variant="subtitle1" color="#b8b8b8" component="div">
              {year}
            </Typography>
            <Typography variant="subtitle1" color="#b8b8b8" component="div">
              {duration}
            </Typography>
            <Typography variant="subtitle1" color="#b8b8b8" component="div">
              {album}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "5rem",
                "@media (max-width:959px)": {
                  justifyContent: "center",
                  textAlign: "center",
                },
                "@media (min-width:600px)": {
                  justifyContent: "flex-end",
                  textAlign: "right",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                color="#b8b8b8"
                component="div"
                marginRight="10px"
              >
                ${price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "#353839",
                  color: "#d6d6d6",
                  border: "1px solid #fff",
                  "&:hover": {
                    backgroundColor: "#d6d6d6",
                    color: "black",
                  },
                }}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default Song;
