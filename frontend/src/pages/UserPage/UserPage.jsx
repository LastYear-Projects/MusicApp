import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";
import { Box, Typography, Avatar, TextField, Grid } from "@mui/material";
import TransitionsModal from "../../components/modal/editSongModal.jsx";
import List from "../../components/list/List";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

const UserPage = () => {
    const [user, setUser] = useState({
        email: "unKnown",
        name: "unKnown",
        profile_image: "unKnown",
    });
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState(null);


    const handleProfilePictureUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("profilePicture", newProfilePicture);

            //TODO: Update profile picture need to figure out from the backend how to do it
            await axios.post('http://localhost:6969/users/update-profile-picture', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("moozikaToken")}`,
                },
            });

            // Fetch updated user data
            await fetchUserData();
        } catch (error) {
            console.error("Error updating profile picture", error);
        }
    };

    const handleFileInputChange = (e) => {
        setNewProfilePicture(e.target.files[0]);
    };


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



    return (
        <Loader isLoading={isLoading}>
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" , paddingBottom: 8}}>
                <Avatar
                    alt="Profile Picture"
                    src={user.profile_image}
                    sx={{ width: 100, height: 100, marginBottom: 4, marginTop: 4 }}
                />

                <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                        setNewProfilePicture(file);
                        return false;
                    }}
                >
                    <Button icon={<UploadOutlined />} size="small">
                        Change Profile Picture
                    </Button>
                </Upload>

                <Typography variant="h4" gutterBottom>
                    {user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom color="white">
                    {user.email}
                </Typography>

                <Grid container spacing={2} marginTop="2rem">
                    <List list={songs} marginB/>
                </Grid>

            </Box>
        </Loader>
    );
};

export default UserPage;
