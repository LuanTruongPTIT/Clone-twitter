const express = require('express');
const routers = express.Router();
const middleware = require('../middleware/middleware')
const { getTrangChu, getPost } = require('../controller/homeController');
routers.get('/trang-chu', middleware.requireHome, getTrangChu);
routers.post('/api/post', getPost)
module.exports = routers;