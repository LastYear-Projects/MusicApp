import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import CheckIcon from '@mui/icons-material/Check';


function Song({
  title,
  artist,
  album,
  genere,
  year,
  duration,
  price,
  album_image,
  youtube_id ,
}) {
  const [user, setUser] = useState({});
  const [isSongExist, setIsSongExist] = useState(false);
  const [isSongInCart,setIsSongInCart]=useState(false);
  const { id: songId } = useParams();
  const songDurationInSeconds = duration / 1000;
  const minutes = parseInt(songDurationInSeconds / 60).toFixed(0);
  const seconds = parseInt(songDurationInSeconds % 60).toFixed(0);
  const songDuration = `${minutes > 9 ? minutes : "0" + minutes}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;

  function addToCartHandler() {
    if(!localStorage.getItem("cart")){
      localStorage.setItem("cart",JSON.stringify([songId]))
    }
    else
    {
      const cart=JSON.parse(localStorage.getItem("cart"));
      cart.push(songId);
      localStorage.setItem("cart",JSON.stringify(cart));
    }
    setIsSongInCart(true);
  }

  const getUser = async () => {
    const userToken = localStorage.getItem("moozikaToken");
    if (!userToken) return;
    const { data } = await axios.post(
      "http://localhost:6969/users/user-details",
      { token: userToken }
    );
    setUser(data);
  };

  const checkSongInCart=()=>{
  const cart=JSON.parse(localStorage.getItem("cart"));
  setIsSongInCart(cart?.find(id=>id==songId)?true:false)
  
  }

  useEffect(() => {
    getUser();
    setIsSongExist(user?.songs?.find(song=>song._id===songId)?true:false)
    checkSongInCart();
    console.log("ive been rendered")
  }, []);
  
  return (
    <Box>
      <Card
        sx={{
          display: "flex",
          backgroundColor: "#1A1A1A",
          maxWidth: "800px",
          height: "auto",
          borderRadius: "20px",
          flexDirection: "column",
          "@media (min-width:600px)": {
            flexDirection: "row",
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
              {songDuration}
            </Typography>
            <Typography variant="subtitle1" color="#b8b8b8" component="div">
              {album}
            </Typography>
            {isSongExist && (
              <Box sx={{ "@media (max-width:959px)": { marginTop: "3rem" } }}>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${youtube_id}`}
                  controls={true}
                  width="100%"
                  height="50%"
                />
              </Box>
            )}
            {!isSongExist &&isSongInCart&& <Box
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
                  The song is already in your cart
                </Typography>
                <CheckIcon sx={{color:"green"}}/>
                </Box>}
            {!isSongExist&&!isSongInCart && (
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
            )}
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default Song;
