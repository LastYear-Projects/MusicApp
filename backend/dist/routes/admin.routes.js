"use strict";
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_controller_1 = require("../controllers/users.controller");
const index_1 = __importDefault(require("../validations/index"));
const orders_controller_1 = require("../controllers/orders.controller");
const songs_controller_1 = require("../controllers/songs.controller");
router
    .post("/users/", index_1.default.checkToken, index_1.default.adminAuth, users_controller_1.getAllUsers) //TODO:LO MEANYEN
    /**
     * @swagger
     * /users/{userId}:
     *   put:
     *     summary: Update a user
     *     description: Update user details by ID
     *     tags: [Users]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the user to update
     *     responses:
     *       200:
     *         description: Successful response
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .put("/users/:userId", index_1.default.checkToken, index_1.default.updatedUserAuth, users_controller_1.updateUser)
    /**
     * @swagger
     * /users/{userId}:
     *   delete:
     *     summary: Delete a user
     *     description: Delete a user by ID
     *     tags: [Users]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the user to delete
     *     responses:
     *       200:
     *         description: Successful response
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .delete("/users/:userId", index_1.default.checkToken, users_controller_1.deleteUser)
    /**
     * @swagger
     * tags:
     *   name: Songs
     *   description: Song management
     */
    /**
     * @swagger
     * /songs/:
     *   post:
     *     summary: Get all songs
     *     description: Retrieve a list of all songs
     *     tags: [Songs]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successful response
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post("/songs/", index_1.default.checkToken, index_1.default.adminAuth, songs_controller_1.getAllSongs) //TODO:LO MEANYEN
    /**
     * @swagger
     * /songs/create:
     *   post:
     *     summary: Create a song
     *     description: Create a new song
     *     tags: [Songs]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       201:
     *         description: Song created successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post("/songs/create", index_1.default.checkToken, songs_controller_1.createSong)
    /**
     * @swagger
     * /songs/{songId}:
     *   put:
     *     summary: Update a song
     *     description: Update song details by ID
     *     tags: [Songs]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: songId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the song to update
     *     responses:
     *       200:
     *         description: Successful response
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .put("/songs/:songId", index_1.default.checkToken, index_1.default.songCreatorAuth, songs_controller_1.updateSong) //TODO:songCreatorAuth
    /**
     * @swagger
     * /songs/{songId}:
     *   delete:
     *     summary: Delete a song
     *     description: Delete a song by ID
     *     tags: [Songs]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: songId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the song to delete
     *     responses:
     *       200:
     *         description: Successful response
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .delete("/songs/:songId", index_1.default.checkToken, index_1.default.songCreatorAuth, songs_controller_1.deleteSong) //TODO:songCreatorAuth
    /**
     * @swagger
     * tags:
     *   name: Orders
     *   description: Order management
     */
    /**
     * @swagger
     * /orders/:
     *   post:
     *     summary: Get all orders
     *     description: Retrieve a list of all orders
     *     tags: [Orders]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successful response
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post("/orders/", index_1.default.checkToken, index_1.default.adminAuth, orders_controller_1.getAllOrders) //TODO:LO MEANYEN
    /**
     * @swagger
     * /orders/{orderId}:
     *   put:
     *     summary: Update an order
     *     description: Update order details by ID
     *     tags: [Orders]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: orderId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the order to update
     *     responses:
     *       200:
     *         description: Successful response
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .put("/orders/:orderId", index_1.default.checkToken, index_1.default.adminAuth, orders_controller_1.updateOrder) //TODO:LO MEANYEN
    /**
     * @swagger
     * /orders/{orderId}:
     *   delete:
     *     summary: Delete an order
     *     description: Delete an order by ID
     *     tags: [Orders]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: orderId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the order to delete
     *     responses:
     *       200:
     *         description: Successful response
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .delete("/orders/:orderId", index_1.default.checkToken, index_1.default.adminAuth, orders_controller_1.deleteOrder); //TODO:LO MEANYEN
exports.default = router;
//# sourceMappingURL=admin.routes.js.map