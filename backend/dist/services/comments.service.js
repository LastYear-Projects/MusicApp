var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Comment = require("../models/CommentScheme");
const { Types: { ObjectId }, } = require("mongoose");
const Song = require("../models/SongScheme");
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Service functions for managing comments
 */
/**
 * @swagger
 * /comments/service/{id}:
 *   get:
 *     summary: Get comments by user ID
 *     description: Retrieve comments associated with a specific user
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
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
const getCommentsByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
    const comments = yield Comment.find({ user: id });
    return comments;
});
/**
 * @swagger
 * /comments/service/song/{id}:
 *   get:
 *     summary: Get comments by song ID
 *     description: Retrieve comments associated with a specific song
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
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
const getCommentsBySongId = (id) => __awaiter(this, void 0, void 0, function* () {
    const comments = yield Song.findById(id)
        .populate("comments")
        .populate({ path: "comments", populate: { path: "user" } })
        .select("comments");
    return comments;
});
/**
 * @swagger
 * /comments/service/{id}:
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
const getCommentById = (id) => __awaiter(this, void 0, void 0, function* () {
    const comment = yield Comment.findById(id);
    return comment;
});
/**
 * @swagger
 * /comments/service:
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
 *               user:
 *                 type: string
 *             required:
 *               - comment
 *               - user
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const createComment = (comment) => __awaiter(this, void 0, void 0, function* () {
    console.log("comment", comment);
    const newComment = new Comment(comment);
    yield newComment.save();
    return newComment;
});
/**
 * @swagger
 * /comments/service/{id}:
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
const updateCommentById = (id, comment) => __awaiter(this, void 0, void 0, function* () {
    const updatedComment = yield Comment.findByIdAndUpdate(id, comment);
    return updatedComment;
});
/**
 * @swagger
 * /comments/service/{id}:
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
 *         description: ID of the comment to be deleted
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const deleteCommentById = (id) => __awaiter(this, void 0, void 0, function* () {
    const comment = yield Comment.findByIdAndDelete(id);
    return comment;
});
/**
 * @swagger
 * /comments/service:
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
const deleteAllComments = () => __awaiter(this, void 0, void 0, function* () {
    const comments = yield Comment.deleteMany();
    return comments;
});
module.exports = {
    getCommentsByUserId,
    getCommentsBySongId,
    getCommentById,
    createComment,
    updateCommentById,
    deleteCommentById,
    deleteAllComments,
};
//# sourceMappingURL=comments.service.js.map