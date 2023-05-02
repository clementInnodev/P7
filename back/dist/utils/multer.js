"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.fileFilter = void 0;
const multer_1 = __importDefault(require("multer"));
const errors_1 = require("./errors");
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(new errors_1.CustomError('Validation Error', 'Le fichier n\'est pas une image valide', 400));
    }
};
exports.fileFilter = fileFilter;
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const nameWithExtension = file.originalname.split(' ').join('-');
        const name = nameWithExtension.split('.')[0];
        const extention = MIME_TYPES[file.mimetype];
        const uniqueDate = Date.now();
        const newFileName = `${name}_${uniqueDate}.${extention}`;
        const decodedFileName = decodeURIComponent(newFileName);
        cb(null, decodedFileName);
    }
});
