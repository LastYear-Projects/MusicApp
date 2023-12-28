/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const validations = require("../validations/index");

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getUserById);

router.get("/email/:email", userController.getUserByEmail);

router.post(
  "/check-song/:songId",
  validations.checkToken,
  userController.checkSong
);

/**
 * @swagger
 * /users/user-details:
 *   post:
 *     summary: User details
 *     description: Get the user details by the token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       401:
 *         description: No token provided
 *       403:
 *         description: Invalid token
 */
router.post(
  "/user-details",
  validations.checkToken,
  userController.getUserDetails
);


/**
 * @swagger
 * /users/:
 *   put:
 *     summary: Update user
 *     description: Get the user details by the token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               updatedUser:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *             required:
 *               - token
 *               - user
 *     responses:
 *       200:
 *         description: updated user
 *       500:
 *         description: Internal Server Error
 */
router.put(
  //TODO: create a middleware to check if the user is the same as the one in the token
  "/",
  validations.checkToken,
  validations.updatedUserAuth,
  userController.updateUser
);

module.exports = router;
