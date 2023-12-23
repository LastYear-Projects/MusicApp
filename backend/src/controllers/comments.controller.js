const commentService = require('../services/comments.service');
const songService = require('../services/songs.service');
const jwt = require('jsonwebtoken');
const { Types: { ObjectId } } = require('mongoose');

const getCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await commentService.getCommentById(id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCommentsBySongId = async (req, res) => {
    try {
        const { songId } = req.params;
        console.log("songId", songId);
        const comments = await commentService.getCommentsBySongId(songId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createComment = async (req, res) => {
    try {
        const {comment, songId, token} = req.body;
        const userId = jwt.decode(token).id;
        const myComment = {
            comment,
            user: userId,
        }
        const newComment = await commentService.createComment(myComment);
        const song = await songService.getSongById(songId);
        song.comments.push(newComment);
        await songService.updateSong(songId, song);
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = { ...req.body };
        const updatedComment = await commentService.updateCommentById(id, comment);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        //find the song that contains the comment
        const song = await songService.getSongByCommentId(id);
        //remove the comment from the song
        song.comments = song.comments.filter(comment => comment._id != id);
        //update the song
        await songService.updateSong(song._id, song);
        const deletedComment = await commentService.deleteCommentById(id);
        res.status(200).json(deletedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAllComments = async (req, res) => {
    try {
        const deletedComments = await commentService.deleteAllComments();
        res.status(200).json(deletedComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCommentsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const comments = await commentService.getCommentsByUserId(userId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getCommentById,
    getCommentsBySongId,
    createComment,
    updateCommentById,
    deleteCommentById,
    deleteAllComments,
    getCommentsByUserId
}