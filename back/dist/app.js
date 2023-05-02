"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const errors_1 = require("./utils/errors");
const posts_1 = require("./router/posts");
const auth_1 = require("./router/auth");
const user_1 = require("./router/user");
const inversify_config_1 = require("./utils/inversify.config");
const db_types_1 = require("./core/types/db.types");
const multer_2 = require("./utils/multer");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use((0, multer_1.default)({ storage: multer_2.storage, fileFilter: multer_2.fileFilter }).single('image'));
app.use(body_parser_1.default.json());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../images')));
app.use('/auth', auth_1.router);
app.use(posts_1.router);
app.use(user_1.router);
app.use((req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});
app.use((err, req, res, next) => {
    let error;
    if (err instanceof Error) {
        error = new errors_1.CustomError('Server Error', err.message, 500);
    }
    else {
        error = err;
    }
    console.log(err);
    return res.status(error.statusCode).json(Object.assign({}, error));
});
const database = inversify_config_1.container.get(db_types_1.DATABASE);
database.connect(app);
