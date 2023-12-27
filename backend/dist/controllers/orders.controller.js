"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_service_1 = __importDefault(require("../services/orders.service"));
const songs_service_1 = __importDefault(require("../services/songs.service"));
const users_service_1 = __importDefault(require("../services/users.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const socketService_1 = require("../utils/socketService");
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
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_service_1.default.getAllOrders();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const getOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orders = yield orders_service_1.default.getOrdersByUser(userId);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield orders_service_1.default.getOrderById(id);
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order, token } = req.body;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const user = yield users_service_1.default.getUserById(decodedToken.id);
        const mySongs = [];
        for (let i = 0; i < order.songs.length; i++) {
            const song = yield songs_service_1.default.getSongById(order.songs[i]);
            mySongs.push(song);
        }
        order.user = user._id;
        const newOrder = yield orders_service_1.default.createOrder(order);
        for (let i = 0; i < mySongs.length; i++) {
            songs_service_1.default.increaseNumOfPurchases(mySongs[i]._id);
        }
        user.songs.push(...mySongs.filter((song) => !user.songs.includes(song._id)));
        yield users_service_1.default.updateUser(user._id, user);
        try {
            const socket = (0, socketService_1.getSocket)();
            socket.emit("updateSongNumOfPurchases", mySongs.map((song) => ({
                songId: song._id,
                numOfPurchases: ++song.numOfPurchases,
            })));
        }
        catch (error) {
            console.log("error in socket", error);
        }
        res.status(200).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.orderId;
        const order = yield orders_service_1.default.deleteOrder(id);
        const user = yield users_service_1.default.getUserById(order.user);
        const orderSongs = [];
        for (let i = 0; i < order.songs.length; i++) {
            const songi = yield songs_service_1.default.getSongById(order.songs[i]);
            songi.numOfPurchases--;
            orderSongs.push(songi);
            songs_service_1.default.updateSong(songi._id, songi);
            if (user)
                user.songs = user.songs.filter((song) => song.toHexString() !== songi._id.toHexString());
        }
        if (user) {
            user.orders = user.orders.filter((order) => order !== id);
            users_service_1.default.updateUser(user._id, user);
        }
        try {
            const socket = (0, socketService_1.getSocket)();
            socket.emit("updateSongNumOfPurchases", orderSongs.map((song) => ({
                songId: song._id,
                numOfPurchases: song.numOfPurchases,
            })));
        }
        catch (error) {
            console.log("error in socket", error);
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const deleteAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_service_1.default.deleteAllOrders();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const { updatedOrder } = req.body;
        // find all the deleted songs and update the numOfPurchases
        const order = yield orders_service_1.default.getOrderById(orderId);
        const user = yield users_service_1.default.getUserById(order.user);
        if (!user)
            return res
                .status(500)
                .json({ message: "cannot update order of a deleted user" });
        const deletedSongs = order.songs
            .map((song) => song.toHexString())
            .filter((song) => !updatedOrder.songs.includes(song));
        const updateToSocket = [];
        for (let i = 0; i < deletedSongs.length; i++) {
            const song = yield songs_service_1.default.getSongById(deletedSongs[i]);
            song.numOfPurchases--;
            updateToSocket.push({
                songId: song._id,
                numOfPurchases: song.numOfPurchases,
            });
            songs_service_1.default.updateSong(song._id, song);
            user.songs = user.songs.filter((s) => s.toHexString() !== song._id.toHexString());
        }
        const newOrder = yield orders_service_1.default.updateOrder(orderId, updatedOrder);
        users_service_1.default.updateUser(user._id, user);
        try {
            const socket = (0, socketService_1.getSocket)();
            socket.emit("updateSongNumOfPurchases", updateToSocket);
        }
        catch (error) {
            console.log("error in socket", error);
        }
        res.status(200).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = {
    getAllOrders,
    getOrdersByUser,
    getOrderById,
    createOrder,
    deleteOrder,
    deleteAllOrders,
    updateOrder,
};
//# sourceMappingURL=orders.controller.js.map