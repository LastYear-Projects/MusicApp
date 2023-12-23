import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Box, Button, CardActionArea, CardActions} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Delete} from "@mui/icons-material";

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
    const songDurationInSeconds = duration / 1000; //50000 -> 50sec -> 00:50
    const minutes = parseInt(songDurationInSeconds / 60).toFixed(0);
    const seconds = parseInt(songDurationInSeconds % 60).toFixed(0);
    const songDuration = `${minutes > 9 ? minutes : "0" + minutes}:${
        seconds > 9 ? seconds : "0" + seconds
    }`;
    const numOfComments = comments ? comments.length : 0;
    const navigate = useNavigate();
    const {pathname} = useLocation();


    const handleDeleteSong = async () => {
        try {
            const token = localStorage.getItem("moozikaToken");
           console.log("the _id is " , _id);
           console.log("the token is " , token);
            await axios.delete(`http://localhost:6969/songs/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            console.log("error with deleting song: ", err);
        }
    }

    const getSongFromServer = async () => {
        const {data} = await axios.post("http://localhost:6969/users/user-details",
            {token: localStorage.getItem("moozikaToken")})
        console.log("the data  ID is: ", data._id);
        console.log("the creator is: ", creator);
        if(!data)
            return false;
        return data._id === creator;
    }



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
                <CardMedia component="img" image={album_image} alt="Album Cover"/>
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
                        sx={{color: "#9A9A9A", fontWeight: 200, fontSize: "1rem"}}
                        variant="body2"
                        color="text.secondary"
                    >
                        {songDuration}
                    </Typography>
                    <Typography
                        sx={{color: "#9A9A9A", fontWeight: 200, fontSize: "1rem"}}
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
                    sx={{color: "#9A9A9A"}}
                    startIcon={<CommentIcon/>}
                >
                    {numOfComments} Comments
                </Button>
                <Button
                    size="small"
                    sx={{color: "#9A9A9A"}}
                    startIcon={<CloudDownloadIcon/>}
                >
                    {numOfPurchases ? numOfPurchases : 0} Purchases
                </Button>


            </CardActions>
            {pathname === '/profile' && getSongFromServer() &&
                <Box margin='0.5rem' textAlign={"center"}>
                    <Button
                        onClick={handleDeleteSong}
                        size="small"
                        sx={{color: "Red"}}
                        textAlign="center"
                        startIcon={<Delete/>}
                    >
                        Delete This Song
                    </Button>
                </Box>}
        </Card>
    );
}
