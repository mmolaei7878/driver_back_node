const Order = require('../models/order');
const Driver = require('../models/driver');
const socketio = require('../../socket')




exports.createOrder = async (req, res, next) => {
    const order = new Order({
        order: {
            order_items: req.body.order.order_items,
        },
        delivery_time: req.body.delivery_time,
        payment_type: req.body.payment_type,
        price: req.body.price,
        forceAssigned: req.body.forceAssigned,
        order_driver: req.body.order_driver,
        multiDropId: req.body.multiDropId,
        isAcceptedOrder: req.body.isAcceptedOrder,
        forceAssigned: req.body.forceAssigned,
        customer_info: {
            customer_note: req.body.customer_info.customer_note,
            address: req.body.customer_info.address,
            phone_number: req.body.customer_info.phone_number,
            latitude: req.body.customer_info.latitude,
            longitude: req.body.customer_info.longitude,
            name: req.body.customer_info.name
        }



    });
    const result = await order.save();

    res.status(201).json({ message: 'order created' });
}

exports.updateOrder = async (req, res, next) => { }

exports.getOrders = async (req, res, next) => {
    const orders = await Order.find();
    res.status(200).json(orders);

}


