import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import {  getAllOrders,
    getOrdersByUser,
    getOrderById,
    createOrder,
    deleteOrder,
    deleteAllOrders,
    updateOrder, } from "../controllers/orders.controller";
import validations from "../validations/index";

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
router.get("/", getAllOrders);

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
router.get("/:id", getOrderById);

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
router.get("/user/:user", getOrdersByUser);

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
router.post("/", validations.checkToken, createOrder);

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
router.delete("/", deleteAllOrders);

export default router;
