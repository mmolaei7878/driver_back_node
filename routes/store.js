const express = require('express')
const storeController = require('../controllers/store_controller')
const storeRoutes = express.Router();


storeRoutes.get('/get-stores', storeController.getStores)
storeRoutes.post('/add-store', storeController.addStore)

module.exports = storeRoutes;

