const Store = require('../models/store')
const io = require('../socket');

exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find().exec();
        res.status(200).json(stores);
    } catch (err) {
        next(err);
    }
};

exports.addStore = async (req, res, next) => {

    const store = new Store({
        title: req.body.title,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        phone: req.body.phone,
        postcode: req.body.postcode,
        addressDetails: req.body.addressDetails,
        image: req.body.image,
    });

    await store.save();
    res.status(201).json({ message: "Store created" });
};
