import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";
import { Box, Typography, Avatar, Button, TextField } from "@mui/material";
import TransitionsModal from "../../components/modal/editSongModal.jsx"; // Make sure to adjust the path as needed

const UserPage = () => {
    const [user, setUser] = useState({
        email: "Email: default value",
        fullName: "fullName: default value",
        dateOfBirth: "dateOfBirth: default value",
        profilePicture: "profilePicture: default value",
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
            const userResponse = await axios.get("http://localhost:6969/user");
            const songsResponse = await axios.get(
                `http://localhost:6969/user/${userResponse.data.id}/songs`
            );

            setUser(userResponse.data);
            setSongs(songsResponse.data);
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
        // Find the song to edit based on songId
        const songToEdit = songs.find((song) => song._id === songId);
        setEditedSong(songToEdit);
        setOpenEditModal(true);
    };

    const handleSaveSong = async () => {
        try {
            // Update the song on the server
            await axios.put(`http://localhost:6969/songs/${editedSong._id}`, editedSong);
            setOpenEditModal(false);
            // Refetch user data to get the updated songs list
            fetchUserData();
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
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <Avatar alt="Profile Picture" src={user.profilePicture} sx={{ width: 100, height: 100, marginBottom: 2 }} />
                <Typography variant="h4" gutterBottom>
                    {user.username}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom color="white">
                    {user.email}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom color="white">
                    {user.dateOfBirth}
                </Typography>

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
                    {songs.length > 0 ? (
                        songs.map((song) => (
                            <Box key={song._id} sx={{ marginBottom: "1rem" }}>
                                {/* Display song details */}
                                <Typography variant="h6">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {song.artist}
                                </Typography>
                                {/* Edit button */}
                                <Button variant="outlined" onClick={() => handleEditSong(song._id)}>
                                    Edit
                                </Button>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="h6" textAlign={"center"}>
                            No bought songs yet
                        </Typography>
                    )}
                </Box>

                <TransitionsModal
                    openModal={openEditModal}
                    setOpenModal={setOpenEditModal}
                    title="Edit Song"
                    closeOnOverlay={true}
                    btnText="Save Changes"
                    btnOnClick={handleSaveSong}
                >
                    {/* Edit song form */}
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
