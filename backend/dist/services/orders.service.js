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
const OrderSchema_1 = __importDefault(require("../models/OrderSchema"));
const users_service_1 = __importDefault(require("./users.service"));
const songs_service_1 = __importDefault(require("./songs.service"));
const OrderSchema = OrderSchema_1.default;
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
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield OrderSchema_1.default.find();
    return orders;
});
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
const getOrdersByUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield OrderSchema_1.default.find({ user: user });
    return orders;
});
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
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const order = yield OrderSchema_1.default.findById(id);
            if (order) {
                return order;
            }
            else {
                throw new Error("Order not found");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    else {
        throw new Error("Id is required");
    }
});
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
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new OrderSchema_1.default({ user: order.user, songs: order.songs });
    yield newOrder.save();
    return newOrder;
});
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
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const order = yield OrderSchema_1.default.findByIdAndDelete(id);
            if (order) {
                return order;
            }
            else {
                throw new Error("Order not found");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    else {
        throw new Error("Id is required");
    }
});
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
const updateOrder = (id, order) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const updatedOrder = yield OrderSchema_1.default.findByIdAndUpdate(id, order);
            if (updatedOrder) {
                return updatedOrder;
            }
            else {
                throw new Error("Order not found");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    else {
        throw new Error("Id is required");
    }
});
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
const deleteAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield OrderSchema.deleteMany();
    //delete all order songs from the users song list
    for (let i = 0; i < orders.length; i++) {
        const user = yield users_service_1.default.getUserById(orders[i].user);
        user.songs = user.songs.filter((song) => !orders[i].songs.includes(song));
        yield users_service_1.default.updateUser(user._id, user);
        for (let j = 0; j < orders[i].songs.length; j++) {
            const song = yield songs_service_1.default.getSongById(orders[i].songs[j]);
            song.numOfPurchases--;
            yield songs_service_1.default.updateSong(song._id, song);
        }
    }
    return orders;
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
//# sourceMappingURL=orders.service.js.map