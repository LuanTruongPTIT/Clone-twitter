const express = require('express')
const middleware = require('../middleware/middleware')
const { getTrangChu } = require('../controller/homeController')
const authController = require('../controller/UserController')
const routers = express.Router();

routers.post('/register', authController.registerUser)
routers.get('/login-user', middleware.requireLogin, authController.getloginUser)
routers.get('/register', authController.getRegister)
// routers.get('/', getTrangChu)
routers.post('/login', authController.loginUser)
module.exports = routers;