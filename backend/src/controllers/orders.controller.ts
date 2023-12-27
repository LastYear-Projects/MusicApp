import ordersService from "../services/orders.service"
import songService from"../services/songs.service"
import userService from"../services/users.service"
import jwt from"jsonwebtoken"
import { getSocket } from "../utils/socketService"

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve all orders in the system
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await ordersService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /orders/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     description: Retrieve orders associated with a specific user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await ordersService.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieve an order based on its ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await ordersService.getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order for a specific user
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: object
 *               token:
 *                 type: string
 *             required:
 *               - order
 *               - token
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order, token } = req.body;
    const decodedToken = jwt.decode(token);
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

    await userService.updateUser(user._id, user);
    try {
      const socket = getSocket();
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

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Delete an order by ID
 *     description: Delete an order based on its ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to be deleted
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.orderId;
    const order = await ordersService.deleteOrder(id);
    const user = await userService.getUserById(order.user);
    const orderSongs = [];
    for (let i = 0; i < order.songs.length; i++) {
      const songi = await songService.getSongById(order.songs[i]);
      songi.numOfPurchases--;
      orderSongs.push(songi);
      songService.updateSong(songi._id, songi);
      if (user)
        user.songs = user.songs.filter(
          (song) => song.toHexString() !== songi._id.toHexString()
        );
    }
    if (user) {
      user.orders = user.orders.filter((order) => order !== id);
      userService.updateUser(user._id, user);
    }
    try {
      const socket = getSocket();
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

/**
 * @swagger
 * /orders:
 *   delete:
 *     summary: Delete all orders
 *     description: Delete all orders in the system
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const deleteAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await ordersService.deleteAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /orders/{orderId}:
 *   put:
 *     summary: Update an order by ID
 *     description: Update an order based on its ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updatedOrder:
 *                 type: object
 *             required:
 *               - updatedOrder
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const { updatedOrder } = req.body;
    // find all the deleted songs and update the numOfPurchases
    const order = await ordersService.getOrderById(orderId);
    const user = await userService.getUserById(order.user);
    if (!user)
      return res
        .status(500)
        .json({ message: "cannot update order of a deleted user" });
    const deletedSongs = order.songs
      .map((song) => song.toHexString())
      .filter((song) => !updatedOrder.songs.includes(song));
    const updateToSocket = [];
    for (let i = 0; i < deletedSongs.length; i++) {
      const song = await songService.getSongById(deletedSongs[i]);
      song.numOfPurchases--;
      updateToSocket.push({
        songId: song._id,
        numOfPurchases: song.numOfPurchases,
      });
      songService.updateSong(song._id, song);
      user.songs = user.songs.filter(
        (s) => s.toHexString() !== song._id.toHexString()
      );
    }
    const newOrder = await ordersService.updateOrder(orderId, updatedOrder);
    userService.updateUser(user._id, user);
    try {
      const socket = getSocket();
      socket.emit("updateSongNumOfPurchases", updateToSocket);
    } catch (error) {
      console.log("error in socket", error);
    }
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
