import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";
import { Box, Typography, Avatar, Button, TextField, Paper, Grid } from "@mui/material";
import TransitionsModal from "../../components/modal/editSongModal.jsx";
import List from "../../components/list/List";

const UserPage = () => {
    const [user, setUser] = useState({
        email: "test",
        name: "fsd",
        profile_image: "fdsf",
    });
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedSong, setEditedSong] = useState({
        title: "",
        artist: "",
        album: "",
        genre: "",
        duration: "",
        album_image: "",
        price: "",
        preview_url: "",
        youtube_id: "",
    });

    const [openEditModal, setOpenEditModal] = useState(false);

    const fetchUserData = async () => {
        try {
            const myUser = await axios.post('http://localhost:6969/users/user-details', { token: localStorage.getItem("moozikaToken") });
            setUser(myUser.data);
            setSongs(myUser.data.songs);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user data", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchUserData();
    }, []);

    const handleEditSong = (songId) => {
        const songToEdit = songs.find((song) => song._id === songId);
        setEditedSong(songToEdit);
        setOpenEditModal(true);
    };

    const handleSaveSong = async () => {
        try {
            await axios.put(`http://localhost:6969/songs/${editedSong._id}`, editedSong);
            setOpenEditModal(false);
        } catch (error) {
            console.error("Error updating song data", error);
        }
    };

    const handleInputChange = (e) => {
        setEditedSong({
            ...editedSong,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Loader isLoading={isLoading}>
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" , paddingBottom: 8}}>
                <Avatar alt="Profile Picture" src={user.profile_image} sx={{ width: 100, height: 100, marginBottom: 4 , marginTop: 4 }} />
                <Typography variant="h4" gutterBottom>
                    {user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom sx={{color:"white"}} >
                    {user.email}
                </Typography>

                <Grid container spacing={2} marginTop="2rem">
                    <List list={songs} marginB/>
                </Grid>

                <TransitionsModal
                    openModal={openEditModal}
                    setOpenModal={setOpenEditModal}
                    title="Edit Song"
                    closeOnOverlay={true}
                    btnText="Save Changes"
                    btnOnClick={handleSaveSong}
                >
                    <TextField
                        label="Title"
                        name="title"
                        value={editedSong.title}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="dense"
                    />
                    <TextField
                        label="Artist"
                        name="artist"
                        value={editedSong.artist}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="dense"
                    />
                    {/* Add other fields for song editing */}
                </TransitionsModal>
            </Box>
        </Loader>
    );
};

export default UserPage;
