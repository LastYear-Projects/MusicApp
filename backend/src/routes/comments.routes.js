const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments.controller');
const validations = require('../validations/index')
router
    .get('/user/:user', commentController.getCommentsByUserId) // TODO: check if needed
    .get('/song/:songId', commentController.getCommentsBySongId)
    .get('/:id', commentController.getCommentById)
    .post('/', validations.checkToken, commentController.createComment)
    .put('/:id', commentController.updateCommentById)
    .delete('/:id', commentController.deleteCommentById)
    .delete('/', commentController.deleteAllComments)

module.exports = router;