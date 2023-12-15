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
import LogoutIcon from "@mui/icons-material/Logout";

import { StyledAutocomplete } from "../../constants/index";

import MoozikaLogo from "../moozikaLogo/MoozikaLogo";
import SignInModal from "../modal/SignInModal.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import css from "./styles.module.css";
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isSignInModalOpen, setIsSignInModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const {data} = useFetch("http://localhost:6969/songs");
  const top100Films = data!=null? data.map((song) => song.title) : [];
  
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/profile");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignInButtonClick = () => {setIsSignInModalOpen(true)};


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
      <MenuItem onClick={() => navigate("/cart")}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
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
      <MenuItem onClick={() => {}}>
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
            <Typography className={css["moozika-logo"]}
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
              renderInput={(params) => (
                <TextField {...params} placeholder="Search..." />
              )}
            ></StyledAutocomplete>
            {isLoggedIn ? (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
                  onClick={handleSignInButtonClick}
                >
                  <Typography>SignIn</Typography>
                </IconButton>
              </Box>
            ) : (
              <MenuItem onClick={() => {}}>Login</MenuItem>
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
      <SignInModal openModal={isSignInModalOpen} setOpenModal={setIsSignInModalOpen} />

    </div>
  );
}
