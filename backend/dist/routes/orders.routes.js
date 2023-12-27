"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const orders_controller_1 = require("../controllers/orders.controller");
const index_1 = __importDefault(require("../validations/index"));
/**
 * @swagger
 * /orders/:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/", orders_controller_1.getAllOrders);
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
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
router.get("/:id", orders_controller_1.getOrderById);
/**
 * @swagger
 * /orders/user/{user}:
 *   get:
 *     summary: Get orders by user ID
 *     description: Retrieve orders based on user ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: user
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
router.get("/user/:user", orders_controller_1.getOrdersByUser);
/**
 * @swagger
 * /orders/:
 *   post:
 *     summary: Create an order
 *     description: Create a new order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/OrderSchema'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/", index_1.default.checkToken, orders_controller_1.createOrder);
/**
 * @swagger
 * /orders/:
 *   delete:
 *     summary: Delete all orders
 *     description: Delete all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.delete("/", orders_controller_1.deleteAllOrders);
exports.default = router;
//# sourceMappingURL=orders.routes.js.map