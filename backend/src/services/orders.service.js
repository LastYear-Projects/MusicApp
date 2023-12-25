const Order = require("../models/OrderSchema");
const {
  Types: { ObjectId },
} = require("mongoose");
const usersService = require("./users.service");
const OrderSchema = require("../models/OrderSchema");

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Returns a list of all orders.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "user": "John Doe", "songs": [1, 2, 3]}]
 */
const getAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};

/**
 * @swagger
 * /orders/user/{user}:
 *   get:
 *     summary: Get orders by user
 *     description: Returns a list of orders by user.
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         description: Username
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "user": "John Doe", "songs": [1, 2, 3]}]
 */
const getOrdersByUser = async (user) => {
  const orders = await Order.find({ user: user });
  return orders;
};
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Returns an order by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "user": "John Doe", "songs": [1, 2, 3]}
 */
const getOrderById = async (id) => {
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
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"user": "John Doe", "songs": [1, 2, 3]}
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "user": "John Doe", "songs": [1, 2, 3]}
 */
const createOrder = async (order) => {
  const newOrder = new Order({ user: order.user, songs: order.songs });
  await newOrder.save();
  return newOrder;
};
/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     description: Deletes an order by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "user": "John Doe", "songs": [1, 2, 3]}
 */
const deleteOrder = async (id) => {
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
/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     description: Updates an order by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"user": "John Doe", "songs": [1, 2, 3]}
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "user": "John Doe", "songs": [1, 2, 3]}
 */
const updateOrder = async (id, order) => {
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
/**
 * @swagger
 * /orders:
 *   delete:
 *     summary: Delete all orders
 *     description: Deletes all orders.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "user": "John Doe", "songs": [1, 2, 3]}]
 */
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

module.exports = {
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  createOrder,
  deleteOrder,
  deleteAllOrders,
  updateOrder,
};
