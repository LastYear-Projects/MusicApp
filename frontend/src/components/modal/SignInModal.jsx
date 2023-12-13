// SignInModal.js
import React from "react";
import {
    Box,
    Modal,
    Fade,
    Typography,
    Button,
    Container, IconButton,
    // ... (other imports)
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import css from "./style.module.css";
import {modalStyle} from "../../constants";

export default function SignInModal({
                                        // eslint-disable-next-line react/prop-types
                                        openModal, setOpenModal, // Add any other necessary props
                                    }) {
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
                        {/* Add your sign-in content here */}
                        {/* You can include a form, buttons, or any other sign-in UI */}
                        <Container>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    // Handle sign-in logic
                                    // You can use the same logic as in your SignIn.js component
                                    // For example, call a function to perform sign-in
                                    // onClose to close the modal after sign-in
                                    setOpenModal(false);
                                }}
                                className={css["button"]}
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
