const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders.controller");
const userController = require("../controllers/users.controller");
const songController = require("../controllers/songs.controller");
const validations = require("../validations/index");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

router
  .post(
    "/users/",
    validations.checkToken,
    validations.adminAuth,
    userController.getAllUsers
  ) //TODO:LO MEANYEN

  .put(
    "/users/:userId",
    validations.checkToken,
    validations.updatedUserAuth,
    userController.updateUser
  )

  /**
   * @swagger
   * /users/:userId:
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
  // .delete("/users/:userId", validations.checkToken, userController.deleteUser)

  /**
   * @swagger
   * tags:
   *   name: Songs
   *   description: Song management
   */

  .post(
    "/songs/",
    validations.checkToken,
    validations.adminAuth,
    songController.getAllSongs
  ) //TODO:LO MEANYEN

  /**
   * @swagger
   * admin/songs/create:
   *   post:
   *     summary: Create a song
   *     description: Create a new song
   *     tags: [Songs]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *               song:
   *                 type: object
   *                 properties:
   *                   title:
   *                     type: string
   *                   artist:
   *                     type: string
   *                   album:
   *                     type: string
   *                   year:
   *                     type: number
   *                   genre:
   *                     type: array
   *                     items:
   *                       type: string
   *                   price:
   *                     type: number
   *                   duration:
   *                     type: number
   *                   image:
   *                     type: string
   *                   album_image:
   *                     type: string
   *                   youtube_id:
   *                     type: string
   *                   preview_url:
   *                     type: string
   *             required:
   *               - token
   *               - song
   *
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
   * /songs/:songId:
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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *               updatedSong:
   *                 type: object
   *                 properties:
   *                   title:
   *                     type: string
   *                   artist:
   *                     type: string
   *                   album:
   *                     type: string
   *                   year:
   *                     type: number
   *                   genre:
   *                     type: array
   *                     items:
   *                       type: string
   *                   price:
   *                     type: number
   *                   duration:
   *                     type: number
   *                   image:
   *                     type: string
   *                   album_image:
   *                     type: string
   *                   youtube_id:
   *                     type: string
   *                   preview_url:
   *                     type: string
   *             required:
   *               - token
   *               - updatedSong
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
   * /songs/:songId:
   *   delete:
   *     summary: Delete a song
   *     description: Delete a song by ID
   *     tags: [Songs]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
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
  )

  /**
   * @swagger
   * tags:
   *   name: Orders
   *   description: Order management
   */

  .post(
    "/orders/",
    validations.checkToken,
    validations.adminAuth,
    orderController.getAllOrders
  ) //TODO:LO MEANYEN

  .put(
    "/orders/:orderId",
    validations.checkToken,
    // validations.adminAuth,
    orderController.updateOrder
  ); //TODO:LO MEANYEN

// .delete(
//   "/orders/:orderId",
//   validations.checkToken,
//   validations.adminAuth,
//   orderController.deleteOrder
// ); //TODO:LO MEANYEN

module.exports = router;
