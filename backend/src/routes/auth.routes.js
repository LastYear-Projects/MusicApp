const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const validations = require("../validations/index");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and generate a token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", userController.userLogin);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/register", validations.registerAuth, userController.createUser);

/**
 * @swagger
 * /auth/google-login:
 *   post:
 *     summary: User login with Google
 *     description: Authenticate a user using Google OAuth and generate a token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenId:
 *                 type: string
 *             required:
 *               - tokenId
 *     responses:
 *       200:
 *         description: Successful login with Google
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/google-login", userController.googleLogin);

/**
 * @swagger
 * /auth/check-token:
 *   post:
 *     summary: User login
 *     description: Check if a token is valid
 *     tags: [Authentication]
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
router.post("/check-token", validations.checkToken, userController.checkToken);

module.exports = router;
