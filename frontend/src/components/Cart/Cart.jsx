import { Stack, Card, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CartItem from "../CartItem/CartItem";
import classes from "./Cart.module.css";
import Loader from "../loader/loader";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartExist, setCartExist] = useState(false);

  function getCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart.length === 0) {
      setCartExist(false);
      setIsLoading(false);
      return;
    }
    cart.forEach(async (itemId) => {
      const { data: songData } = await axios.get(
        `http://localhost:6969/songs/${itemId}`
      );
      setCartItems((prev) => [...prev, songData]);
    });
    setCartExist(true);
    setIsLoading(false);
  }
  function handeleDeleteSong(id) {
    setIsLoading(true);
    const cartIds = JSON.parse(localStorage.getItem("cart"));
    const newCart = cartIds.filter((itemId) => itemId !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    if (newCart.length === 0) {
      setCartExist(false);
    }
    setIsLoading(false);
  }
  async function handleCheckout() {
    setIsLoading(true);
    const response = await axios.post("http://localhost:6969/orders", {
      token: localStorage.getItem("moozikaToken"),
      order: { songs: cartItems.map((item) => item._id) },
    });
    if(response.status==200){
    message.success("Order created successfully");
    localStorage.setItem("cart", JSON.stringify([]));
    setCartItems([]);
    setCartExist(false);
    setIsLoading(false);
    setTimeout(() => {
      navigate("/");
    }, 750);
  }
  else{
    message.error("Order failed");
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
      <Card elevation={7} style={{ backgroundColor: "#181818", width: "65%" }}>
        <Stack
          direction={"row"}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              color="white"
              style={{ width: "0.075rem" }}
            />
          }
        >
          <Stack
            direction={"column"}
            style={{
              width: "30%",
              alignContent: "center",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            <h2 className={classes.title}>Order Summery</h2>
            <div className={classes.cartText}>
              <h4>Total items:</h4>
              <h5>{cartItems.length}</h5>
            </div>
            <div className={classes.cartText}>
              <h4>Subtotal:</h4>
              <h5>{subtotal}</h5>
            </div>
            <div className={classes.cartText}>
              <h4>Discount:</h4>
              <h5>Free</h5>
            </div>
            <div className={classes.cartText}>
              <h4>Total:</h4>
              <h5>{subtotal}</h5>
            </div>
            <button className={classes.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#6A6A6A",
                borderRadius: "4px",
              },
            }}
            style={{
              paddingLeft: "2rem",
              paddingBottom: "2rem",
              width: "100%",
              maxHeight: "400px",
              overflow: "auto",
            }}
          >
            <h2 className={classes.title}>Shopping Cart</h2>
            {cartExist ? (
              cartItems.map((item) => {
                return (
                  <CartItem
                    album_image={item.album_image}
                    title={item.title}
                    price={item.price}
                    removeSong={() => handeleDeleteSong(item._id)}
                  />
                );
              })
            ) : (
              <div
                style={{
                  padding: "0.25rem",
                  color: "black",
                  backgroundColor: "#9A9A9A",
                  marginRight: "3rem",
                  marginTop: "1rem",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="p" style={{ display: "block" }}>
                  Cart is Empty...
                </Typography>
                <Typography variant="p">
                  Please add items to the cart...
                </Typography>
              </div>
            )}
          </Stack>
        </Stack>
      </Card>
    </Loader>
  );
};
export default Cart;
