/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

import {Router} from "express";
const router=Router();
import userController from "../controllers/users.controller";
import validations from "../validations/index";

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

router.post("/email", userController.getUserByEmail);
router.get("/name/:name", userController.getUserByName);

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

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Test Create a new user
 *     description: Test Create a new user with the provided name, email, and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User successfully created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/Test/', userController.createUser);
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Test Delete a user
 *     description: Delete a user by their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/Test/:userId', userController.deleteUser);
export default router
