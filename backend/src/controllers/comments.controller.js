const commentService = require("../services/comments.service");
const songService = require("../services/songs.service");
const jwt = require("jsonwebtoken");
const {
  Types: { ObjectId },
} = require("mongoose");

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
const getCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await commentService.getCommentById(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
const getCommentsBySongId = async (req, res) => {
  try {
    const { songId } = req.params;
    console.log("songId", songId);
    const comments = await commentService.getCommentsBySongId(songId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
const createComment = async (req, res) => {
  try {
    const { comment, songId, token } = req.body;
    const userId = jwt.decode(token).id;
    const myComment = {
      comment,
      user: userId,
    };
    const newComment = await commentService.createComment(myComment);
    const song = await songService.getSongById(songId);
    song.comments.push(newComment);
    await songService.updateSong(songId, song);
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
const updateCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = { ...req.body };
    const updatedComment = await commentService.updateCommentById(id, comment);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
const deleteCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    // Find the song that contains the comment
    const song = await songService.getSongByCommentId(id);
    // Remove the comment from the song
    song.comments = song.comments.filter((comment) => comment._id != id);
    // Update the song
    await songService.updateSong(song._id, song);
    const deletedComment = await commentService.deleteCommentById(id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
const deleteAllComments = async (req, res) => {
  try {
    const deletedComments = await commentService.deleteAllComments();
    res.status(200).json(deletedComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
const getCommentsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const comments = await commentService.getCommentsByUserId(userId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommentById,
  getCommentsBySongId,
  createComment,
  updateCommentById,
  deleteCommentById,
  deleteAllComments,
  getCommentsByUserId,
};
