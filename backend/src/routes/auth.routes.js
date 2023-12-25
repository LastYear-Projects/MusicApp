const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const validations = require('../validations/index')


router
.post("/login",userController.userLogin)
.post("/register", validations.registerAuth, userController.createUser)
.post("/google-login", userController.googleLogin)
.post("check-token", validations.checkToken, userController.checkToken)


  module.exports = router;