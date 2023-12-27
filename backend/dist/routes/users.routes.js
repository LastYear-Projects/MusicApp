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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const index_1 = __importDefault(require("../validations/index"));
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
router.get("/", users_controller_1.default.getAllUsers);
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user based on their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
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
router.get("/:userId", users_controller_1.default.getUserById);
/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Retrieve a user based on their email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/email/:email", users_controller_1.default.getUserByEmail);
/**
 * @swagger
 * /users/check-song/{userId}:
 *   post:
 *     summary: Check user's song
 *     description: Check a specific song for the user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
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
router.post("/check-song/:userId", index_1.default.checkToken, users_controller_1.default.checkSong);
/**
 * @swagger
 * /users/user-details:
 *   post:
 *     summary: Get user details
 *     description: Retrieve details of the authenticated user
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
router.post("/user-details", index_1.default.checkToken, users_controller_1.default.getUserDetails);
/**
 * @swagger
 * /users/:
 *   put:
 *     summary: Update user
 *     description: Update user details
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../models/UserScheme.js'
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put("/", index_1.default.checkToken, index_1.default.updatedUserAuth, users_controller_1.default.updateUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map