import { Stack, Card, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CartItem from "../CartItem/CartItem";
import classes from "./Cart.module.css";
import Loader from "../loader/loader";
const Dummy_CartItems = [
  {
    album_image:
      "https://images.ctfassets.net/g8qtv9gzg47d/6SiUg4TCwLA9OfEy3KlQy7/41c90a47f0250d130323056f69f6cdca/5de2bba479d7577cd722e553.jpeg?fl=progressive&fm=jpg&q=80",
    title: "baby yoda",
    price: 10,
  },
  {
    album_image:
      "https://images.ctfassets.net/g8qtv9gzg47d/6SiUg4TCwLA9OfEy3KlQy7/41c90a47f0250d130323056f69f6cdca/5de2bba479d7577cd722e553.jpeg?fl=progressive&fm=jpg&q=80",
    title: "baby yoda",
    price: 10,
  },
  {
    album_image:
      "https://images.ctfassets.net/g8qtv9gzg47d/6SiUg4TCwLA9OfEy3KlQy7/41c90a47f0250d130323056f69f6cdca/5de2bba479d7577cd722e553.jpeg?fl=progressive&fm=jpg&q=80",
    title: "baby yoda",
    price: 10,
  },
  {
    album_image:
      "https://images.ctfassets.net/g8qtv9gzg47d/6SiUg4TCwLA9OfEy3KlQy7/41c90a47f0250d130323056f69f6cdca/5de2bba479d7577cd722e553.jpeg?fl=progressive&fm=jpg&q=80",
    title: "baby yoda",
    price: 10,
  },
];

const Cart = () => {
    
  const [cartItems, setCartItems] = useState(Dummy_CartItems); // will be a get request from the local storage - which will be an array of cart objects
  const [isLoading, setIsLoading] = useState(true);
  const [cartExist, setCartExist] = useState(false);
  let subtotal = 0;
  cartItems.forEach((item) => {
    subtotal += item.price;
  });
  useEffect(() =>{
    const dataId=localStorage.getItem("cart");
    if(!dataId)
    {
      setCartExist(false);
      setIsLoading(false)
      return
    }
    setIsLoading(false);
  }
  ,[cartItems])

  
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
                <h4>Shipping:</h4>
                <h5>Free</h5>
            </div>
            <div className={classes.cartText}>
                <h4>Total:</h4>
                <h5>{subtotal}</h5>
            </div>
            <button className={classes.checkoutButton}>Checkout</button>
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
            {cartExist ? cartItems.map((item) => {
              return (
                <CartItem
                  album_image={item.album_image}
                  title={item.title}
                  price={item.price}
                />
              );
            }):
                <div style={{padding:"0.25rem",color:"black", backgroundColor:"#9A9A9A",marginRight:"3rem",marginTop:"1rem",borderRadius:"8px",fontWeight:"bold"}}>
                <Typography variant="p" style={{display:"block"}}>Cart is Empty...</Typography>
                <Typography variant="p" >Please add items to the cart...</Typography>
                </div>
            }
          </Stack>
        </Stack>
      </Card>
    </Loader>
  );
};
export default Cart;
