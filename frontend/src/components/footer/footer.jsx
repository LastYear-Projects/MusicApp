import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Import the new icon
import { Box } from "@mui/material";

const Footer = () => {
    const handleTopPageClick = () => {
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Optional: Add smooth scrolling
        });
    };

    const handleEmailClick = () => {
        // Open the default email client with the default email address
        window.location.href = "mailto:WebAppMoozika@example.com";
    };

    const handleHomePageClick = () => {
        // might need to change this to the actual home page
        window.location.href = "http://localhost:3000/";
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <BottomNavigation
                showLabels
                sx={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "#1A1A1A",
                    color: "#FFC105", // Set the color for all icons
                    "& .MuiBottomNavigationAction-root": {
                        "&:hover": {
                            color: "#FFC105", // Change the color on hover
                        },
                    },
                }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={handleHomePageClick}/>
                <BottomNavigationAction label="Email" icon={<EmailIcon />} onClick={handleEmailClick} />
                <BottomNavigationAction
                    label="TopPage"
                    icon={<ArrowUpwardIcon />}
                    onClick={handleTopPageClick}/>
            </BottomNavigation>
        </Box>
    );
};

export default Footer;
