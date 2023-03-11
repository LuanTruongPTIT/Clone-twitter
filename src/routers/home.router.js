const express = require('express');
const routers = express.Router();
const { getTrangChu } = require('../controller/homeController');
routers.get('/trang-chu', getTrangChu);
module.exports = routers;