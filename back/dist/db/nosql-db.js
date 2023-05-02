"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const socket_1 = require("../utils/socket");
const mongooseInit = (app) => {
    mongoose_1.default.connect('mongodb+srv://test:test@projet7.3elrsct.mongodb.net/chat?retryWrites=true&w=majority')
        .then(_ => {
        console.log('Connected to database');
        const server = app.listen(3000);
        const io = (0, socket_1.init)(server);
        io.on('connection', (socket) => {
            console.log('Client connected');
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    })
        .catch(error => console.log(error));
};
exports.default = mongooseInit;
