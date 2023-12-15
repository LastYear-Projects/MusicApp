// SignInModal.js
import React from "react";
import {
    Box,
    Modal,
    Fade,
    Typography,
    Button,
    Container,
    IconButton,
    TextField,
    Link,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import css from "./style.module.css";
import {modalStyle} from "../../constants";
import {GoogleLogin} from "react-google-login";
import axios from "axios";



export default function SignInModal({
                                        // eslint-disable-next-line react/prop-types
                                        openModal, setOpenModal,
                                    }) {
    const [userNameAndPassword, setUserNameAndPassword] = React.useState({
        email: "",
        password: "",
    });

    const handleSignIn =async () => {
        // console.log("username: ", userNameAndPassword.email + " password: ", userNameAndPassword.password);

        await axios.post(
            "http://localhost:6969/auth/login",
            {
                email: userNameAndPassword.email,
                password: userNameAndPassword.password
            })
            .then((userToken) =>
                {
                    console.log("userToken: ", userToken.data.token)
                    localStorage.setItem("moozikaToken", userToken.data.token);
                })
            .catch((err) =>
                {console.log("error: ", err.response.data)});

        setOpenModal(false);
    };
    const onSuccess = (response) => {
        console.log("Google sign in success: ", response.accessToken);
        localStorage.setItem("moozikaToken", response.accessToken);
        setOpenModal(false);
    };
    const onFailure = (response) => {
        // TODO:Handle Google sign-in response here
        console.log("Google sign in failure:", response);
    };
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
            >
                <Fade in={openModal}>
                    <Box sx={modalStyle}>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => setOpenModal(false)}
                            aria-label="close"
                            sx={{position: "absolute", top: "8px", right: "8px"}}
                        >
                            <ClearIcon/>
                        </IconButton>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{fontWeight: "bold"}}
                        >
                            Sign In
                        </Typography>
                        <Container>
                            <TextField
                                value={userNameAndPassword.email}
                                onChange={(e) => setUserNameAndPassword({
                                    ...userNameAndPassword,
                                    email: e.target.value
                                })}
                                label="Username"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoFocus
                                InputProps={{
                                    style: {color: "white"},
                                }}
                                InputLabelProps={{
                                    style: {color: "white"},
                                }}
                            />
                            <TextField
                                value={userNameAndPassword.password}
                                onChange={(e) => setUserNameAndPassword({
                                    ...userNameAndPassword,
                                    password: e.target.value
                                })}
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                type="password"
                                InputProps={{
                                    style: {color: "white"},
                                    notchedOutline: {borderColor: "white"},
                                }}
                                InputLabelProps={{
                                    style: {color: "white"},
                                }}

                            />
                            <Button
                                variant="contained"
                                onClick={handleSignIn}
                                className={css["button"]}
                                fullWidth
                            >
                                Sign In
                            </Button>
                            <Typography variant="body2" color="white" align="center" sx={{marginTop: 2}}>
                                Don't have an account?{" "}
                                <Link href="/signup" underline="always" color="primary">
                                    Sign Up
                                </Link>
                            </Typography>

                            <GoogleLogin
                                clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy="single_host_origin"
                                // cookiePolicy="none"
                                className={css["googleButton"]}

                                render={(renderProps) => (
                                    <Button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className={css["googleButton"]}
                                        fullWidth
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <img
                                            src="https://developers.google.com/identity/images/g-logo.png"
                                            alt="Google logo"
                                            style={{
                                                marginRight: '10px',
                                                alignItems: 'center',
                                                width: '20px',
                                                height: '20px',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <span>Sign In with Google</span>
                                    </Button>
                                )}
                            />
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
