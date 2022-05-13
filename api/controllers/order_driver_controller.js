const Order = require('../models/order');
const Driver = require('../models/driver');
const socketio = require('../../socket');



exports.getOrderDriver = async (req, res, next) => {
    const driverId = req.params.driverId;
    try {
        let orders = await Order.find({ order_driver: driverId }).exec();
        res.status(200).json(orders);

    } catch (error) {
        next(error);
    }
};

exports.assignOrder = async (req, res, next) => {
    const driverId = req.body.driverId;
    const orderId = req.body.orderId;
    try {
        const driver = await Driver.findById(driverId);
        driver.order_driver.push(orderId);
        await driver.save();
        const order = await Order.findById(orderId);
        order.order_driver = driverId;
        order.status = 'assigned';
        await order.save();
        const foundedDriver = socketio.findDriver(driverId);
        if (foundedDriver) {

            socketio.getIO().to(foundedDriver['socketId']).emit('order', JSON.stringify([order]));
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

exports.acceptOrderDriver = (req, res, next) => {

    const orderIdList = req.body.orderIdList
    console.log(orderIdList);
}