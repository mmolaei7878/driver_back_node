const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Driver = require('../models/driver');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const hashedPw = await bcrypt.hash(req.body.password, 12);

        const driver = new Driver({
            email: req.body.email,
            password: hashedPw,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            vehcile_type: req.body.vehcile_type,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            store: req.body.store,
        });
        const result = await driver.save();
        res.status(201).json({ message: 'Driver created', userId: result._id });
    } catch (error) {

        next(error);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedDriver;
    try {
        const driver = await Driver.findOne({ email: email });
        if (!driver) {
            const error = new Error('A Driver with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedDriver = driver;
        const isEqual = await bcrypt.compare(password, driver.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedDriver.email,
                driverId: loadedDriver._id.toString()
            },
            'HashRandForAuthAndAuthorize',
            { expiresIn: '3h' }
        );
        console.log(token, loadedDriver);

        res.status(200).json({ token: token, driverId: loadedDriver._id });
    } catch (err) {

        next(err);
    }
};

/* exports.getUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ status: user.status });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}; */

