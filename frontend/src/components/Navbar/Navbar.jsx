import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  TextField,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";

import { StyledAutocomplete } from "../../constants/index";

import MoozikaLogo from "../moozikaLogo/MoozikaLogo";
import SignInModal from "../modal/SignInModal.jsx";

import useFetch from "../../hooks/useFetch.jsx";
import css from "./styles.module.css";
import Chat from "../chat/Chat.jsx";
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isSignInModalOpen, setIsSignInModalOpen] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const navigate = useNavigate();
  const { data } = useFetch("http://localhost:6969/songs");
  const top100Films =
    data != null
      ? data.map((song) => ({ title: song.title, _id: song._id }))
      : [];

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignInButtonClick = () => {
    setIsSignInModalOpen(true);
    handleMobileMenuClose(); // Close mobile menu after clicking
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isLoggedIn && (
        <>
          <MenuItem
            onClick={() => {
              setIsChatOpen(true);
              handleMobileMenuClose();
            }}
          >
            <IconButton sx={{ color: "black" }}>
              <ChatIcon />
            </IconButton>
            <p>Chat</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/cart");
              handleMobileMenuClose();
            }}
          >
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <p>Cart</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMobileMenuClose();
              navigate("/profile");
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsLoggedIn(false);
              handleMobileMenuClose();
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </>
      )}

      {!isLoggedIn && (
        <MenuItem onClick={handleSignInButtonClick}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <Typography>Login</Typography>
          </IconButton>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#1A1A1A",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              className={css["moozika-logo"]}
              onClick={() => navigate("/")}
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <MoozikaLogo />
            </Typography>
            <StyledAutocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search..." />
              )}
              onChange={(e, value) => {
                value ? navigate(`/song/${value._id}`) : "";
              }}
            ></StyledAutocomplete>
            {isLoggedIn ? (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton onClick={() => setIsChatOpen(true)}>
                  <ChatIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => navigate("/cart")}
                >
                  <Badge badgeContent={4} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle onClick={() => navigate("/profile")} />
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => setIsLoggedIn(false)}
                >
                  <Typography>Logout</Typography>
                </IconButton>
              </Box>
            ) : (
              <MenuItem
                onClick={handleSignInButtonClick}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                Login
              </MenuItem>
            )}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
      <main style={{ flex: "1" }}>
        <Outlet />
      </main>
      <SignInModal
        openModal={isSignInModalOpen}
        setOpenModal={setIsSignInModalOpen}
      />
      <Chat isOpen={isChatOpen} handleOpen={() => setIsChatOpen(false)} />
    </div>
  );
}
