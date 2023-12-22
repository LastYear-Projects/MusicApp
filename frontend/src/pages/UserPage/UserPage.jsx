import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";
import {Box, Typography, Avatar, Grid} from "@mui/material";
import List from "../../components/list/List";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

const UserPage = () => {
    const [user, setUser] = useState({
        email: "unKnown",
        name: "unKnown",
        profile_image: "unKnown",
        songs: []
    });
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    const fetchUserData = async () => {
        try {
            const myUser = await axios.post('http://localhost:6969/users/user-details', {token: localStorage.getItem("moozikaToken")});
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
    const filterSongsCreatedByUser = () => {
        //TODO: we might need to change the field user._id
        return user.songs.filter((song) => song.creator === user._id);
    };


    return (
        <Loader isLoading={isLoading}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: 8
            }}>
                <Avatar
                    alt="Profile Picture"
                    src={user.profile_image}
                    sx={{width: 100, height: 100, marginBottom: 4, marginTop: 4}}
                />

                <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                        setNewProfilePicture(file);
                        return false;
                    }}
                >
                    <Button icon={<UploadOutlined/>} size="small">
                        Change Profile Picture
                    </Button>
                </Upload>

                <Typography variant="h4" gutterBottom>
                    {user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom color="white">
                    {user.email}
                </Typography>

                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        borderBottom: "2px solid white",
                        display: "inline-block",
                        marginTop: 7,
                        paddingRight: 90,
                        paddingLeft: 3,
                        fontWeight: 'bold',
                        color: 'white',
                        textTransform: 'uppercase',
                    }}
                >
                    Songs Owned By User
                </Typography>
                <Grid container spacing={2} marginTop="2rem">
                    {user.songs.length > 0 ? (
                        <List list={user.songs} style={{ marginTop: '1rem' }} />
                    ) : (
                        <Typography variant="h6" color="white" gutterBottom
                                    sx={{
                                        paddingRight: 30,
                                        paddingLeft: 15,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textTransform: 'uppercase',
                                    }}
                        >
                            No songs found. Start adding some amazing songs!
                        </Typography>
                    )}
                </Grid>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        borderBottom: "2px solid white",
                        display: "inline-block",
                        marginTop: 7,
                        paddingRight: 90,
                        paddingLeft: 3,
                        fontWeight: 'bold',
                        color: 'white',
                        textTransform: 'uppercase',
                    }}
                >
                    Songs created By User
                </Typography>

                <Grid container spacing={2} marginTop="2rem">
                    {filterSongsCreatedByUser().length > 0 ? (
                        <List list={filterSongsCreatedByUser()} />
                    ) : (
                        <Typography variant="h6" color="white" gutterBottom
                                    sx={{
                                        paddingRight: 30,
                                        paddingLeft: 15,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textTransform: 'uppercase',
                                    }}
                        >


                            No songs created by you. Be the first to create one!
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Loader>
    );
};

export default UserPage;
