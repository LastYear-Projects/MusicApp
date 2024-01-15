import ordersService from "../services/orders.service";
import songService from "../services/songs.service";
import userService from "../services/users.service";
import jwt from "jsonwebtoken";
import Socket from "../utils/socketService"; 
import { Request, Response } from "express";
import Token from "../utils/tokenType";
const getAllOrders = async (req:Request, res:Response) => {
  try {
    const orders = await ordersService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getOrdersByUser = async (req:Request, res:Response) => {
  try {
    const userId = req.params.userId;
    const orders = await ordersService.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getOrderById = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    const order = await ordersService.getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createOrder = async (req:Request, res:Response) => {
  try {
    const { order, token } = req.body;
    const decodedToken = jwt.decode(token) as Token;
    const user = await userService.getUserById(decodedToken.id);
    const mySongs = [];
    for (let i = 0; i < order.songs.length; i++) {
      const song = await songService.getSongById(order.songs[i]);
      mySongs.push(song);
    }
    order.user = user._id;
    const newOrder = await ordersService.createOrder(order);
    for (let i = 0; i < mySongs.length; i++) {
      songService.increaseNumOfPurchases(mySongs[i]._id);
    }
    user.songs.push(
      ...mySongs.filter((song) => !user.songs.includes(song._id))
    );

    await userService.updateUser(user._id.toString(), user);
    try {
      const socket = Socket.getSocket();
      socket.emit(
        "updateSongNumOfPurchases",
        mySongs.map((song) => ({
          songId: song._id,
          numOfPurchases: ++song.numOfPurchases,
        }))
      );
    } catch (error) {
      console.log("error in socket", error);
    }
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteOrder = async (req:Request, res:Response) => {
  try {
    const id = req.params.orderId;
    const order = (await ordersService.deleteOrder(id)).value;
    const user = await userService.getUserById(order.user.toString());
    const orderSongs = [];
    for (let i = 0; i < order.songs.length; i++) {
      const songi = await songService.getSongById(order.songs[i].toString());
      songi.numOfPurchases--;
      orderSongs.push(songi);
      songService.updateSong(songi._id.toString(), songi);
      if (user)
        user.songs = user.songs.filter(
          (song) => song.toString() !== songi._id.toString()
        );
    }
    if (user) {
      userService.updateUser(user._id.toString(), user);
    }
    try {
      const socket = Socket.getSocket();
      socket.emit(
        "updateSongNumOfPurchases",
        orderSongs.map((song) => ({
          songId: song._id,
          numOfPurchases: song.numOfPurchases,
        }))
      );
    } catch (error) {
      console.log("error in socket", error);
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// const deleteAllOrders = async (req:Request, res:Response) => {
//   try {
//     const orders = await ordersService.deleteAllOrders();
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const updateOrder = async (req:Request, res:Response) => {
  try {
    const orderId = req.params.orderId;
    const { updatedOrder } = req.body;
    // find all the deleted songs and update the numOfPurchases
    const order = await ordersService.getOrderById(orderId);
    const user = await userService.getUserById(order.user.toString());
    if (!user)
      return res
        .status(500)
        .json({ message: "cannot update order of a deleted user" });
    const deletedSongs = order.songs
      .map((song) => song.toString())
      .filter((song) => !updatedOrder.songs.includes(song));
    const updateToSocket = [];
    for (let i = 0; i < deletedSongs.length; i++) {
      const song = await songService.getSongById(deletedSongs[i]);
      song.numOfPurchases--;
      updateToSocket.push({
        songId: song._id,
        numOfPurchases: song.numOfPurchases,
      });
      songService.updateSong(song._id.toString(), song);
      user.songs = user.songs.filter(
        (s) => s.toString() !== song._id.toString()
      );
    }
    const newOrder = await ordersService.updateOrder(orderId, updatedOrder);
    userService.updateUser(user._id.toString(), user);
    try {
      const socket = Socket.getSocket();
      socket.emit("updateSongNumOfPurchases", updateToSocket);
    } catch (error) {
      console.log("error in socket", error);
    }
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default  {
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  createOrder,
  deleteOrder,
  //deleteAllOrders,
  updateOrder,
};
