const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const validations = require('../validations/index')
router
.get('/', userController.getAllUsers)
.get('/:userId', userController.getUserById)
.get('/email/:email', userController.getUserByEmail)
.post('/check-song/:userId', validations.checkToken, userController.checkSong)
.post('/user-details', validations.checkToken, userController.getUserDetails)
.put('/', validations.checkToken, validations.updatedUserAuth, userController.updateUser) 



module.exports = router;