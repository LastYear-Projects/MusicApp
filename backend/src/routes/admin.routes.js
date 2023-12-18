const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders.controller');
const userController = require('../controllers/users.controller');
const songController = require('../controllers/songs.controller');
const validations = require('../validations/index')

router
    .post('/users/', validations.checkToken, validations.adminAuth, userController.getAllUsers) //TODO:LO MEANYEN
    .put('/users/:userId', validations.checkToken, validations.updatedUserAuth, userController.updateUser)
    .delete('/users/:userId', validations.checkToken, userController.deleteUser)

    .post('/songs/', validations.checkToken, validations.adminAuth, songController.getAllSongs) //TODO:LO MEANYEN
    .post('/songs/create', validations.checkToken, songController.createSong)
    .put('/songs/:songId', validations.checkToken, validations.songCreatorAuth, songController.updateSong) //TODO:songCreatorAuth
    .delete('/songs/:songId', validations.checkToken, validations.songCreatorAuth, songController.deleteSong) //TODO:songCreatorAuth

    .post('/orders/', validations.checkToken, validations.adminAuth, orderController.getAllOrders) //TODO:LO MEANYEN
    .put('/orders/:orderId', validations.checkToken, validations.adminAuth, orderController.updateOrder) //TODO:LO MEANYEN
    .delete('/orders/:orderId', validations.checkToken, validations.adminAuth, orderController.deleteOrder) //TODO:LO MEANYEN


module.exports = router;