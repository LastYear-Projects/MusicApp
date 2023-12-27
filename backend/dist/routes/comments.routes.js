"use strict";
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comments_controller_1 = __importDefault(require("../controllers/comments.controller"));
const index_1 = __importDefault(require("../validations/index"));
/**
 * @swagger
 * /comments/user/{user}:
 *   get:
 *     summary: Get comments by user ID
 *     description: Retrieve comments based on user ID
 *     tags: [Comments]
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
router.get("/user/:user", comments_controller_1.default.getCommentsByUserId);
/**
 * @swagger
 * /comments/song/{songId}:
 *   get:
 *     summary: Get comments by song ID
 *     description: Retrieve comments based on song ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: songId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the song
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/song/:songId", comments_controller_1.default.getCommentsBySongId);
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     description: Retrieve a comment based on its ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", comments_controller_1.default.getCommentById);
/**
 * @swagger
 * /comments/:
 *   post:
 *     summary: Create a comment
 *     description: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/CommentScheme'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/", index_1.default.checkToken, comments_controller_1.default.createComment);
/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     description: Update a comment based on its ID
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/CommentScheme'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", comments_controller_1.default.updateCommentById);
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Delete a comment based on its ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", comments_controller_1.default.deleteCommentById);
/**
 * @swagger
 * /comments/:
 *   delete:
 *     summary: Delete all comments
 *     description: Delete all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.delete("/", comments_controller_1.default.deleteAllComments);
exports.default = router;
//# sourceMappingURL=comments.routes.js.map