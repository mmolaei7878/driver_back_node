let io;

let drivers = [];

exports.init = httpServer => {
    io = require('socket.io')(httpServer);
    return io;
}
exports.getIO = () => {

    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
}
exports.findDriver = (driverId) => {

    const foundedDriver = drivers.find(element => element.driverId === driverId);
    if (foundedDriver) {
        return foundedDriver;
    }
}
exports.removeDriver = (socketId) => {
    const newDriversList = drivers.filter(element => element.socketId !== socketId);
    drivers = [];
    drivers = newDriversList;

}

exports.addDriver = (socketId, driverId) => {
    const foundedDriver = drivers.find(element => element.driverId === driverId);
    if (foundedDriver) {
        foundedDriver.socketId = socketId;
        return;
    }
    drivers.push({
        "socketId": socketId,
        "driverId": driverId,
    });

}

