const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const validations = require('../validations/index')


router
.post("/login",userController.userLogin)
.post("/register", validations.registerAuth, userController.createUser)


  module.exports = router;