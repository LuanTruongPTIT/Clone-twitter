const express = require('express')
const middleware = require('../middleware/middleware')
const { getTrangChu } = require('../controller/homeController')
const authController = require('../controller/UserController')
const routers = express.Router();

routers.post('/register', authController.registerUser)
routers.get('/login', authController.loginUser)
routers.get('/register', authController.getRegister)
routers.get('/', getTrangChu)
module.exports = routers;