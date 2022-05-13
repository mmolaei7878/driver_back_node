const express = require('express')
const orderDriverController = require('../controllers/order_driver_controller')

const orderDriverRoutes = express.Router();
const isAuth = require('../middleware/is_auth')

orderDriverRoutes.get('/get-order-driver/:driverId', orderDriverController.getOrderDriver);
orderDriverRoutes.post('/assign-order', orderDriverController.assignOrder);
orderDriverRoutes.post('/accept-order-driver', orderDriverController.acceptOrderDriver)

module.exports = orderDriverRoutes;



