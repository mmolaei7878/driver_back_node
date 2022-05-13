const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    order: {
        order_items: [
            {
                title: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                },

                order_sub_items: [
                    {
                        title: {
                            type: String,
                            required: true,
                        },
                        quantity: {
                            type: Number,
                        },
                    }
                ],
            }
        ],


    },
    status: {
        type: String,
        default: "new"

    },
    isAcceptedOrder: {
        type: Boolean,
    },

    multiDropId: {
        type: String,
    },
    delivery_time: {
        type: Number,
        required: true,
    },

    payment_type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,

    },
    forceAssigned: {
        type: Boolean,
    },

    order_driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
    },
    customer_info: {
        name: {
            type: String,
            required: true,
        },
        customer_note: {
            type: String,


        },
        address: {
            type: String,
            required: true,

        },
        phone_number: {
            type: Number,
            required: true,

        },

        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },



    },
});

module.exports = mongoose.model('Order', orderSchema);