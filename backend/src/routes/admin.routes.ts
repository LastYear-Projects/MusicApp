/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

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
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders.controller");
const userController = require("../controllers/users.controller");
const songController = require("../controllers/songs.controller");
const validations = require("../validations/index");

router
  .post(
    "/users/",
    validations.checkToken,
    validations.adminAuth,
    userController.getAllUsers
  ) //TODO:LO MEANYEN

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
  .put(
    "/users/:userId",
    validations.checkToken,
    validations.updatedUserAuth,
    userController.updateUser
  )

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
  .delete("/users/:userId", validations.checkToken, userController.deleteUser)

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
  .post(
    "/songs/",
    validations.checkToken,
    validations.adminAuth,
    songController.getAllSongs
  ) //TODO:LO MEANYEN

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
  .post("/songs/create", validations.checkToken, songController.createSong)

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
  .put(
    "/songs/:songId",
    validations.checkToken,
    validations.songCreatorAuth,
    songController.updateSong
  ) //TODO:songCreatorAuth

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
  .delete(
    "/songs/:songId",
    validations.checkToken,
    validations.songCreatorAuth,
    songController.deleteSong
  ) //TODO:songCreatorAuth

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
  .post(
    "/orders/",
    validations.checkToken,
    validations.adminAuth,
    orderController.getAllOrders
  ) //TODO:LO MEANYEN

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
  .put(
    "/orders/:orderId",
    validations.checkToken,
    validations.adminAuth,
    orderController.updateOrder
  ) //TODO:LO MEANYEN

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
  .delete(
    "/orders/:orderId",
    validations.checkToken,
    validations.adminAuth,
    orderController.deleteOrder
  ); //TODO:LO MEANYEN

module.exports = router;
