import {Stack,Card,Divider} from '@mui/material';
import React from 'react'
import { useState } from 'react';
import CartItem from '../CartItem/CartItem';
import classes from './Cart.module.css'
const Dummy_CartItems=[
    {album_image:"https://images.ctfassets.net/g8qtv9gzg47d/6SiUg4TCwLA9OfEy3KlQy7/41c90a47f0250d130323056f69f6cdca/5de2bba479d7577cd722e553.jpeg?fl=progressive&fm=jpg&q=80",
    title:"baby yoda",
    price:10},
    {album_image:"https://images.ctfassets.net/g8qtv9gzg47d/6SiUg4TCwLA9OfEy3KlQy7/41c90a47f0250d130323056f69f6cdca/5de2bba479d7577cd722e553.jpeg?fl=progressive&fm=jpg&q=80",
    title:"baby yoda",
    price:10},
    {album_image:"https://images.ctfassets.net/g8qtv9gzg47d/6SiUg4TCwLA9OfEy3KlQy7/41c90a47f0250d130323056f69f6cdca/5de2bba479d7577cd722e553.jpeg?fl=progressive&fm=jpg&q=80",
    title:"baby yoda",
    price:10},
    {album_image:"https://images.ctfassets.net/g8qtv9gzg47d/6SiUg4TCwLA9OfEy3KlQy7/41c90a47f0250d130323056f69f6cdca/5de2bba479d7577cd722e553.jpeg?fl=progressive&fm=jpg&q=80",
    title:"baby yoda",
    price:10}];

const Cart=()=> {
    const [cartItems,setCartItems]=useState(Dummy_CartItems) // will be a get request from the local storage - which will be an array of cart objects

    let subtotal=0
    cartItems.forEach(item=>{
        subtotal+=item.price
    })
    return (
    <Card elevation={7} style={{backgroundColor:"#181818",width:"65%"}}>
        <Stack direction={'row'} divider={<Divider orientation='vertical' flexItem color="white" style={{width:"0.075rem"}} />}>
            <Stack direction={'column'} style={{width:"30%" ,alignContent:"center",marginLeft:"1rem",marginRight:"1rem"}}>
            <h2 className={classes.title}>Order Summery</h2>
            <h4 className={classes.cartText}>Total Items:{cartItems.length}</h4>
            <h4 className={classes.cartText}>Subtotal:{subtotal}</h4>
            <h4 className={classes.cartText}>Shipping: Free</h4>
            <h4 className={classes.total}>Total:{subtotal}</h4>
            <button className={classes.checkoutButton}>Checkout</button>
            </Stack>
            <Stack direction={'column'} style={{paddingLeft:"2rem",paddingBottom:"2rem",width:"100%", maxHeight:"400px",overflow:"auto"}}>
                <h2 className={classes.title}>Shopping Cart</h2>    
            {cartItems.map((item)=>{
                
               return <CartItem album_image={item.album_image} title={item.title} price={item.price}/>
            })}
            </Stack>
        </Stack>
    </Card>
  )
}
export default Cart