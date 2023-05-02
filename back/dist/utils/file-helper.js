"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const errors_1 = require("./errors");
const deleteFile = (filePath) => {
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            const error = new errors_1.CustomError("Server Error", "Erreur lors de la tentative de suppression du fichier " + filePath, 500);
            throw error;
        }
    });
};
exports.deleteFile = deleteFile;
