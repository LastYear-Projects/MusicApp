"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentService = require("../services/comments.service");
const songService = require("../services/songs.service");
const jwt = require("jsonwebtoken");
const { Types: { ObjectId }, } = require("mongoose");
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by ID
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
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const comment = yield commentService.getCommentById(id);
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /comments/song/{songId}:
 *   get:
 *     summary: Get comments by song ID
 *     description: Retrieve comments associated with a specific song
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
const getCommentsBySongId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { songId } = req.params;
        console.log("songId", songId);
        const comments = yield commentService.getCommentsBySongId(songId);
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment for a specific song
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               songId:
 *                 type: string
 *               token:
 *                 type: string
 *             required:
 *               - comment
 *               - songId
 *               - token
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, songId, token } = req.body;
        const userId = jwt.decode(token).id;
        const myComment = {
            comment,
            user: userId,
        };
        const newComment = yield commentService.createComment(myComment);
        const song = yield songService.getSongById(songId);
        song.comments.push(newComment);
        yield songService.updateSong(songId, song);
        res.status(200).json(newComment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     description: Update a comment based on its ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties you want to update
 *             required:
 *               - // Add required properties
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const updateCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const comment = Object.assign({}, req.body);
        const updatedComment = yield commentService.updateCommentById(id, comment);
        res.status(200).json(updatedComment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
 *
 *           type: string
 *         required: true
 *         description: ID of the comment to be deleted
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const deleteCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Find the song that contains the comment
        const song = yield songService.getSongByCommentId(id);
        // Remove the comment from the song
        song.comments = song.comments.filter((comment) => comment._id != id);
        // Update the song
        yield songService.updateSong(song._id, song);
        const deletedComment = yield commentService.deleteCommentById(id);
        res.status(200).json(deletedComment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /comments:
 *   delete:
 *     summary: Delete all comments
 *     description: Delete all comments in the system
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const deleteAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedComments = yield commentService.deleteAllComments();
        res.status(200).json(deletedComments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /comments/user/{userId}:
 *   get:
 *     summary: Get comments by user ID
 *     description: Retrieve comments associated with a specific user
 *     tags: [Comments]
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
const getCommentsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const comments = yield commentService.getCommentsByUserId(userId);
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = {
    getCommentById,
    getCommentsBySongId,
    createComment,
    updateCommentById,
    deleteCommentById,
    deleteAllComments,
    getCommentsByUserId,
};
//# sourceMappingURL=comments.controller.js.map