"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const index_1 = __importDefault(require("../validations/index"));
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
router.post("/login", users_controller_1.default.userLogin);
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
router.post("/register", index_1.default.registerAuth, users_controller_1.default.createUser);
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
router.post("/google-login", users_controller_1.default.googleLogin);
/**
 * @swagger
 * /auth/check-token:
 *   post:
 *     summary: Check user token validity
 *     description: Check if a user token is valid
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/check-token", index_1.default.checkToken, users_controller_1.default.checkToken);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map