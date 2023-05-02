"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const secret_key_1 = require("../utils/secret-key");
const errors_1 = require("../utils/errors");
const isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        const error = new errors_1.CustomError('Authorization Error', 'Utilisateur non autorisé !', 401);
        next(error);
    }
    else {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const isValid = (0, jsonwebtoken_1.verify)(token, secret_key_1.secretKey);
            req.userId = isValid.userId;
        }
        catch (err) {
            const error = new errors_1.CustomError('Authorization Error', 'Utilisateur non autorisé !', 401);
            next(error);
        }
        next();
    }
};
exports.isAuth = isAuth;
