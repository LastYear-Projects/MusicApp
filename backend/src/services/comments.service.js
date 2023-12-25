const Comment = require("../models/CommentScheme");
const {
  Types: { ObjectId },
} = require("mongoose");
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
const getCommentsByUserId = async (id) => {
  const comments = await Comment.find({ user: id });
  return comments;
};

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
const getCommentsBySongId = async (id) => {
  const comments = await Song.findById(id)
    .populate("comments")
    .populate({ path: "comments", populate: { path: "user" } })
    .select("comments");
  return comments;
};

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
const getCommentById = async (id) => {
  const comment = await Comment.findById(id);
  return comment;
};

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
const createComment = async (comment) => {
  console.log("comment", comment);
  const newComment = new Comment(comment);
  await newComment.save();
  return newComment;
};

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
const updateCommentById = async (id, comment) => {
  const updatedComment = await Comment.findByIdAndUpdate(id, comment);
  return updatedComment;
};

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
const deleteCommentById = async (id) => {
  const comment = await Comment.findByIdAndDelete(id);
  return comment;
};

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
const deleteAllComments = async () => {
  const comments = await Comment.deleteMany();
  return comments;
};

module.exports = {
  getCommentsByUserId,
  getCommentsBySongId,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
  deleteAllComments,
};
