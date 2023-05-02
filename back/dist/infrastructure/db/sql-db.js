"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeInit = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const socket_1 = require("../../utils/socket");
exports.sequelize = new sequelize_1.Sequelize('p7', 'root', 'root', {
    dialect: 'mysql',
    host: '127.0.0.1'
});
const sequelizeInit = (app) => {
    exports.sequelize.sync({ force: false })
        .then(_ => {
        console.log('Connected to database');
        const server = app.listen(3000);
        (0, socket_1.init)(server);
        const io = (0, socket_1.getIO)();
        io.on('connection', (socket) => {
            console.log('Client connected');
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    })
        .catch(err => console.error(err));
};
exports.sequelizeInit = sequelizeInit;
