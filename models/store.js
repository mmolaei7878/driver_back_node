const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const storeSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    addressDetails: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model('Store', storeSchema);
