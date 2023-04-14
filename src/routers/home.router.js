const express = require('express');
const routers = express.Router();
const middleware = require('../middleware/middleware')
const { getTrangChu, getPost, getApiPost, getApiLikePost, getApiReweetPost } = require('../controller/homeController');
routers.get('/trang-chu', middleware.requireHome, getTrangChu);
routers.post('/api/post', getPost)
routers.get('/api/posts/user', getApiPost)
routers.put('/api/posts/:id/like', getApiLikePost)
routers.post('/api/posts/:id/retweet', getApiReweetPost)
module.exports = routers;