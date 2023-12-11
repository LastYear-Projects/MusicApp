const ordersService = require('../services/orders.service');
const songService = require('../services/songs.service');
const userService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const {getSocket} = require('../utils/socketService');
// const mongoose = require('mongoose');
// const {Types: {ObjectId}} = require('mongoose');
const getAllOrders = async (req, res) => {
    try {
        const orders = await ordersService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrdersByUser = async (req, res) => {
    try {
        const user = req.params.user;
        const orders = await ordersService.getOrdersByUser(user);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await ordersService.getOrderById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOrder = async (req, res) => {
    try {
        const {order, token} = req.body;
        const decodedToken = jwt.decode(token);
        const user = await userService.getUserById(decodedToken.id);
        const mySongs = [];
        for(let i = 0; i < order.songs.length; i++){
            const song = await songService.getSongById(order.songs[i]);
            mySongs.push(song);
        }
        order.user = user._id;
        const newOrder = await ordersService.createOrder(order);
        for(let i = 0; i < mySongs.length; i++){
            songService.increaseNumOfPurchases(mySongs[i]._id);
        }
        //await userService.addOrderToUser(user._id, newOrder._id);
        //await userService.addSongsToUser(user._id, mySongs);
        user.orders.push(newOrder._id);
        user.songs.push(...mySongs.filter(song => !user.songs.includes(song._id)));
        


        

        userService.updateUser(user._id, user);
        try{
            const socket = getSocket();
            socket.emit('updateSongNumOfPurchases', mySongs.map(song => ({"songId": song._id, "numOfPurchases": ++song.numOfPurchases})));
        } catch(error){
            console.log("error in socket", error);
        }
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//todo: make it a service
const deleteOrder = async (req, res) => {
    try {
        const id = req.params.orderId;
        const order = await ordersService.deleteOrder(id);
        const user = await userService.getUserById(order.user);
        const orderSongs = []
        for(let i = 0; i < order.songs.length; i++){
            const songi = await songService.getSongById(order.songs[i]);
            songi.numOfPurchases--;
            orderSongs.push(songi);
            songService.updateSong(songi._id, songi);
            if(user) user.songs = user.songs.filter(song => song.toHexString() !== songi._id.toHexString());
        }
        if(user){
            user.orders = user.orders.filter(order => order !== id);
            userService.updateUser(user._id, user);
        }
        try{
            const socket = getSocket();
            socket.emit('updateSongNumOfPurchases', orderSongs.map(song => ({"songId": song._id, "numOfPurchases": song.numOfPurchases})));
        } catch(error){
            console.log("error in socket", error);
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//todo: delete all orders
const deleteAllOrders = async (req, res) => {
    try{
        const orders = await ordersService.deleteAllOrders();
        res.status(200).json(orders);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const {updatedOrder} = req.body;
        // find all the deleted songs and update the numOfPurchases
        const order = await ordersService.getOrderById(orderId);
        const user = await userService.getUserById(order.user);
        if(!user) return res.status(500).json({message: "cannot update order of a deleted user"})
        const deletedSongs = order.songs.map(song=>song.toHexString()).filter(song => !updatedOrder.songs.includes(song));
        const updateToSocket = [];
        for(let i = 0; i < deletedSongs.length; i++){
            const song = await songService.getSongById(deletedSongs[i]);
            song.numOfPurchases--;
            updateToSocket.push({"songId": song._id, "numOfPurchases": song.numOfPurchases});
            songService.updateSong(song._id, song);
            user.songs = user.songs.filter(s => s.toHexString() !== song._id.toHexString());
        }
        const newOrder = await ordersService.updateOrder(orderId, updatedOrder);
        userService.updateUser(user._id, user);
        try{
            const socket = getSocket();
            socket.emit('updateSongNumOfPurchases',updateToSocket);
        } catch(error){
            console.log("error in socket", error);
        }
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllOrders,
    getOrdersByUser,
    getOrderById,
    createOrder,
    deleteOrder,
    deleteAllOrders,
    updateOrder
}