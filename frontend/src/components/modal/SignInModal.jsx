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
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import css from "./style.module.css";
import {modalStyle} from "../../constants";

export default function SignInModal({
                                        openModal, setOpenModal,
                                    })
{
    const handleSignIn = () => {
        // Handle sign-in logic here
        // You can use the same logic as in your actual sign-in functionality
        // For example, validate the form and call a function to perform sign-in
        // onClose to close the modal after sign-in
        setOpenModal(false);
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
                                label="Username"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoFocus
                                InputProps={{
                                style: { color: "white" },
                            }}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                type="password"
                                InputProps={{
                                    style: { color: "white" },
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
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
