import { Grid, Card, Divider, Typography, Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/CartItem";
import classes from "./Cart.module.css";
import Loader from "../loader/loader";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";

const socket = io("http://localhost:7070");

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartExist, setCartExist] = useState(false);

  async function getCart() {
    const cart =
      localStorage.getItem("cart").length > 0
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
    if (cart.length === 0) {
      setCartExist(false);
      setIsLoading(false);
      return;
    }
    const promises = cart.map(async (itemId) => {
      const { data: songData } = await axios.get(
        `http://localhost:6969/songs/${itemId}`
      );
      return songData;
    });
    const cartSongs = await Promise.all(promises);
    setCartItems(cartSongs);
    setCartExist(true);
    setIsLoading(false);
  }

  function handeleDeleteSong(id) {
    setIsLoading(true);
    const cartIds = JSON.parse(localStorage.getItem("cart"));
    const newCart = cartIds.filter((itemId) => itemId !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    socket.emit("cart", {
      token: localStorage.getItem("moozikaToken"),
      cart: newCart,
      numberInCart: newCart.length,
    });

    if (newCart.length === 0) {
      setCartExist(false);
    }
    setIsLoading(false);
  }

  async function handleCheckout() {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:6969/orders", {
        token: localStorage.getItem("moozikaToken"),
        order: { songs: cartItems.map((item) => item._id) },
      });

      if (response.status === 200) {
        message.success("Order created successfully");
        localStorage.setItem("cart", JSON.stringify([]));
        setCartItems([]);
        setCartExist(false);
        setTimeout(() => {
          navigate("/");
        }, 750);
      } else {
        message.error("Order failed");
      }
    } catch (error) {
      message.error("An error occurred during checkout");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  let subtotal = 0;
  cartItems.forEach((item) => {
    subtotal += item.price;
  });
  subtotal = subtotal.toFixed(2);

  return (
    <Loader isLoading={isLoading}>
      <Card
        elevation={7}
        style={{ backgroundColor: "#181818", minWidth: "65%" }}
      >
        <Grid container spacing={4} sx={{ padding: "1rem" }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" className={classes.title}>
              Order Summary
            </Typography>
            <div className={classes.cartText}>
              <Typography variant="h5">Total items:</Typography>
              <Typography variant="h6">{cartItems.length}</Typography>
            </div>
            <div className={classes.cartText}>
              <Typography variant="h5">Subtotal:</Typography>
              <Typography variant="h6">{subtotal}</Typography>
            </div>
            <div className={classes.cartText}>
              <Typography variant="h5">Discount:</Typography>
              <Typography variant="h6">Free</Typography>
            </div>
            <div className={classes.cartText}>
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h6">{subtotal}</Typography>
            </div>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  margin: "2rem 0.5rem 2rem 0.5rem",
                  borderRadius: "10px",
                  outline: "white",
                  fontWeight: "bold",
                  backgroundColor: "#5A5A5A",
                  border: "1px solid white",
                  width: "65%",
                }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} sx={{ padding: "1rem" }}>
            <Typography
              variant="h4"
              className={classes.title}
              sx={{ marginBottom: "0.5rem" }}
            >
              Shopping Cart
            </Typography>
            <Box
              sx={{
                maxHeight: "40vh",
                marginBottom: "1.5rem",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#6A6A6A",
                  borderRadius: "4px",
                },
              }}
            >
              {cartExist ? (
                cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    album_image={item.album_image}
                    title={item.title}
                    price={item.price}
                    removeSong={() => handeleDeleteSong(item._id)}
                  />
                ))
              ) : (
                <Box
                  sx={{
                    color: "white",
                    backgroundColor: "#5A5A5A",
                    borderRadius: "1rem",
                    padding: "0.5rem",
                  }}
                >
                  <Typography variant="body1">Cart is Empty...</Typography>
                  <Typography variant="body1">
                    Please add items to the cart...
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Loader>
  );
};

export default Cart;
