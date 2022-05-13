const express = require('express')
const driverController = require('../controllers/driver_controller')

const driverRoutes = express.Router();
const isAuth = require('../middleware/is_auth')

driverRoutes.put('/edit-driver-profile/:driverId', driverController.editProfile);
driverRoutes.get('/get-driver/:driverId', driverController.getDriver);
driverRoutes.patch('/update-driver-status/:driverId', driverController.updateDriverStatus);
driverRoutes.patch('/block-driver/:driverId', driverController.blockDriver)



module.exports = driverRoutes;



