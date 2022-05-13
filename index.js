const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const driverRoutes = require('./api/routes/driver')
const authRoutes = require('./api/routes/auth')
const storeRoutes = require('./api/routes/store')
const orderRoutes = require('./api/routes/order')
const orderDriverRoutes = require('./api/routes/order_driver')

const socketio = require('./socket')
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");


const port = process.env.PORT || 8080;
const app = express();


// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const swaggerOption = {
//     swaggerDefinition: {
//         info: {
//             title: 'Dispatcher & Driver',
//             description: 'written in NodeJS ',
//             servers: ['http://localhost:8080']
//         }

//     },
//     apis: ['./routes/*.js']
// }

// const swaggerDocs = swaggerJsDoc(swaggerOption);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),
    { flags: 'a' }
)

app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));




app.use('/api/auth', authRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/order-driver', orderDriverRoutes);





app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(statusCode).json({ message: message, data: data });
});
//MONGO_USER=molaei MONGO_PASSWORD=molaei78 MONGO_DATABASE=dispatcher
mongoose.connect('mongodb+srv://molaei:molaei78@cluster0.0qt6v.mongodb.net/dispatcher?retryWrites=true&w=majority')
    .then(result => {
        const server = app.listen(port);
        const io = require('./socket')
        io.init(server).on('connection', socket => {


            socket.on('driver', data => {
                console.log(socket.id)
                socketio.addDriver(socket.id, data['driverid'])
            })

            socket.on('disconnect', data => {
                console.log("A Driver Disconncted" + socket.id)
                io.removeDriver(socket.id);
            })

        });







        console.log('connected DB')
    });


