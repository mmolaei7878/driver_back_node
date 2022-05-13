const express = require('express')
const orderController = require('../controllers/order_controller')

const orderRoutes = express.Router();
const isAuth = require('../middleware/is_auth')


orderRoutes.post('/create-order', orderController.createOrder);
orderRoutes.get('/get-orders', orderController.getOrders);


module.exports = orderRoutes;



