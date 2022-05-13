const Driver = require('../models/driver')
const socketio = require('../../socket');





exports.editProfile = async (req, res, next) => {
    const driverId = req.params.driverId;

    try {
        let driver = await Driver.findById(driverId);
        if (!driver) {
            const error = new Error('Driver not found.');
            error.statusCode = 404;
            throw error;
        }
        driver.email = req.body.email
        driver.first_name = req.body.first_name
        driver.last_name = req.body.last_name
        driver.phone_number = req.body.phone_number
        driver.vehcile_type = req.body.vehcile_type
        driver.password = driver.password

        const result = await driver.save();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

exports.acceptOrder = async (req, res, next) => { }


exports.getDriver = async (req, res, next) => {
    const driverId = req.params.driverId;
    try {
        let driver = await Driver.findById(driverId).populate('store').select('-password');
        if (!driver) {
            const error = new Error('Driver not found.');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(driver);
    } catch (error) {
        next(error);

    }
}


exports.updateDriverStatus = async (req, res, next) => {
    const newStatus = req.body.driverWorkstatus;
    try {
        const driver = await Driver.findById(req.params.driverId);
        if (!driver) {
            const error = new Error('Driver not found.');
            error.statusCode = 404;
            throw error;
        }
        driver.driverWorkstatus = newStatus;
        await driver.save();

        res.status(200).json({ message: 'driver status updated.' });
    } catch (err) {
        next(err);
    }
};

exports.blockDriver = async (req, res, next) => {
    const driverId = req.params.driverId;
    const isDriverBlocked = req.body.isDriverBlocked;

    try {
        let driver = await Driver.findById(driverId);
        driver.isDriverBlocked = isDriverBlocked;
        await driver.save();
        const foundedDriver = socketio.findDriver(driverId);
        if (foundedDriver) {

            socketio.getIO().to(foundedDriver['socketId']).emit('driver-status', {
                isDriverBlocked: isDriverBlocked,
            });
        }


        res.status(200).json({ message: "Driver " + driver.first_name + " " + driver.last_name + " Blocked" });
    } catch (error) {
        next(error);
    }
};
