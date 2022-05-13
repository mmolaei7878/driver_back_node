const express = require('express');
const { body } = require('express-validator');
const Driver = require('../models/driver');
const authController = require('../controllers/auth_controller');

const authRoutes = express.Router();

authRoutes.post(
    '/register',
    [
        // E-mail
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return Driver.findOne({ email: value }).then(driver => {
                    if (driver) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        // Password
        body('password')
            .trim()
            .isLength({ min: 5 }),

        // FullName
        body('first_name')
            .trim()
            .not()
            .isEmpty(),
        body('last_name')
            .trim()
            .not()
            .isEmpty(),

        // phone_number

        body('phone_number').trim().isLength({ min: 10 }),

        // vehcile_type
        body('vehcile_type').trim().not()
            .isEmpty(),
    ],
    authController.register
);

authRoutes.post('/login', [
    body('email').trim()
        .not()
        .isEmpty().normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 }),
], authController.login);



module.exports = authRoutes;



