import Order,{IOrder} from "../models/OrderSchema";
import {ObjectId} from "mongoose"
import usersService from "./users.service"
import songsService from "./songs.service"
import OrderSchema from "../models/OrderSchema"; // THE SAME AS FIRST LINE??

const getAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};

const getOrdersByUser = async (user:ObjectId) => {
  const orders = await Order.find({ user: user });
  return orders;
};

const getOrderById = async (id:ObjectId) => {
  if (id) {
    try {
      const order = await Order.findById(id);
      if (order) {
        return order;
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Id is required");
  }
};

const createOrder = async (order:IOrder) => {
  const newOrder = new Order({ user: order.user, songs: order.songs });
  await newOrder.save();
  return newOrder;
};

const deleteOrder = async (id:ObjectId) => {
  if (id) {
    try {
      const order = await Order.findByIdAndDelete(id);
      if (order) {
        return order;
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Id is required");
  }
};

const updateOrder = async (id:ObjectId, order:IOrder) => {
  if (id) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, order);
      if (updatedOrder) {
        return updatedOrder;
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Id is required");
  }
};

const deleteAllOrders = async () => {
  const orders = await OrderSchema.deleteMany();
  //delete all order songs from the users song list
  for (let i = 0; i < orders.length; i++) {
    const user = await usersService.getUserById(orders[i].user);
    user.songs = user.songs.filter((song) => !orders[i].songs.includes(song));
    await usersService.updateUser(user._id, user);
    for (let j = 0; j < orders[i].songs.length; j++) {
      const song = await songsService.getSongById(orders[i].songs[j]);
      song.numOfPurchases--;
      await songsService.updateSong(song._id, song);
    }
  }
  return orders;
};

export default {
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  createOrder,
  deleteOrder,
  deleteAllOrders,
  updateOrder,
};
