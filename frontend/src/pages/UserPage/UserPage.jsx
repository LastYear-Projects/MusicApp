import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";
import {Box, Typography, Avatar, Grid} from "@mui/material";
import List from "../../components/list/List";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import AddSong from "../../components/addSongModal/addSong.jsx";

const UserPage = () => {
    const [user, setUser] = useState({
        email: "Pleas sign in to see your profile",
        name: "",
        profile_image: "unKnown",
        songs: []
    });
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [openAddSongModal, setOpenAddSongModal] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
    const [ownSongs, setOwnSongs] = useState([]);

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPasswordForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleUpdatePassword = async () => {
        if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
            // Show an error message or handle password mismatch
            console.error('New password and confirmation do not match');
            return;
        }
        try {
            const response = await axios.put('http://localhost:6969/users/update-password', {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("moozikaToken")}`
                }
            });

            // Handle the response, e.g., show a success message
            console.log('Password updated successfully', response.data);
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            });
            setShowPasswordForm(false);
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Error updating password', error);
        }
        setShowPasswordForm(false);
        setIsPasswordFormOpen(false);
    };


    const fetchUserData = async () => {
        try {
            const myUser = await axios.post('http://localhost:6969/users/user-details', {token: localStorage.getItem("moozikaToken")});
            setUser(myUser.data);
            setSongs(myUser.data.songs);
            setIsLoading(false);
            setOwnSongs(myUser.data.songs.filter((song) => song.creator === myUser.data._id));
        } catch (error) {
            console.error("Error fetching user data", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchUserData();

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };


    }, []);


    const handleAddSong = () => {
        setOpenAddSongModal(true);
    };


    const handleAddSongSuccess = (newSong) => {
        console.log("the new song is", newSong);
        setUser((prevUser) => ({
            ...prevUser,
            songs: [...prevUser.songs, newSong],
        }));
        setOwnSongs((prevSongs) => [...prevSongs, newSong]);

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
                <Button onClick={() => setIsPasswordFormOpen(true)} variant="contained" color="primary"
                        sx={{marginBottom: 2}}>
                    Change Password
                </Button>

                {isPasswordFormOpen && (
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{
                            borderBottom: "2px solid white",
                            display: "inline-block",
                            whiteSpace: 'nowrap',
                            marginTop: 7,
                            paddingRight: windowWidth <= 600 ? 10 : 90,
                            paddingLeft: 3,
                            fontWeight: 'bold',
                            color: 'white',
                            textTransform: 'uppercase',
                        }}>
                            Update Password
                        </Typography>
                        <form>
                            <input
                                type="password"
                                name="currentPassword"
                                placeholder="Current Password"
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordChange}
                            />
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                            />
                            <input
                                type="password"
                                name="confirmNewPassword"
                                placeholder="Confirm New Password"
                                value={passwordForm.confirmNewPassword}
                                onChange={handlePasswordChange}
                            />
                            <Button type="button" onClick={handleUpdatePassword} variant="contained" color="primary"
                                    sx={{marginBottom: 2}}>
                                Update Password
                            </Button>
                        </form>
                    </Box>
                )}

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
                        whiteSpace: 'nowrap',
                        marginTop: 7,
                        paddingRight: windowWidth <= 600 ? 10 : 90,
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
                        <List list={user.songs} style={{marginTop: '1rem'}}/>
                    ) : (
                        <Typography variant="h6" color="white" gutterBottom
                                    sx={{
                                        paddingLeft: 15,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textTransform: 'uppercase',
                                        paddingRight: windowWidth <= 600 ? 10 : 90,
                                        whiteSpace: 'nowrap'
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
                        paddingRight: windowWidth <= 600 ? 10 : 90,
                        paddingLeft: 3,
                        fontWeight: 'bold',
                        color: 'white',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap'
                    }}
                >
                    Songs created By User
                </Typography>

                <Grid container spacing={2} marginTop="2rem">
                    {ownSongs.length > 0
                        ? (<List list={ownSongs}/>)
                        :
                        (<Typography variant="h6"
                                    color="white"
                                    gutterBottom
                                    sx={{
                                        paddingLeft: 15,
                                        display: "inline-block",
                                        paddingRight: windowWidth <= 600 ? 10 : 90,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textTransform: 'uppercase',
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap'
                                    }}
                        >
                            No songs created by you. Be the first to create one!
                        </Typography>)

                    }
                    )};
                </Grid>

                <Button onClick={handleAddSong} variant="contained" color="primary">
                    Add Song
                </Button>
                <AddSong
                    openModal={openAddSongModal}
                    setOpenModal={setOpenAddSongModal}
                    onSuccess={handleAddSongSuccess}
                />


            </Box>
        </Loader>
    )
        ;
};

export default UserPage;
