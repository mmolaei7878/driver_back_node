const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    vehcile_type: {
        type: String,
        required: true,
    },
    driverRequestStatus: {
        type: String,
        default: "waiting",
    },
    driverWorkstatus: {
        type: String,
        default: "offline",
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    store: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Store"
    },
    isDriverBlocked: {
        type: Schema.Types.Boolean,
        default: false,
    },
    order_driver: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        }
    ]
    ,
    totoalOrderAssigned: {
        type: Number,
    },
    totalOrderCompleted: {
        type: Number,

    },
    totalOrders: {
        type: Number,
    }
});

module.exports = mongoose.model('Driver', driverSchema);