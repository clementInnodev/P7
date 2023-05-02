"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeUsers = exports.deleteUser = exports.updatePassword = exports.updateUser = exports.getUserById = exports.getUser = exports.getUsersWithFiltres = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../utils/errors");
const use_case_types_1 = require("../core/types/use-case.types");
const inversify_config_1 = require("../utils/inversify.config");
const bcrypt_1 = require("bcrypt");
const getUsersWithFiltres = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const USERS_PER_PAGE = req.query.limit_per_page || req.query.limit_per_page !== undefined ? +req.query.limit_per_page : 0;
        const page = req.query.page || req.query.page !== undefined ? +req.query.page : 0;
        const skip = USERS_PER_PAGE !== 0 && page !== 0 ? (page - 1) * USERS_PER_PAGE : 0;
        const users = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUsers).execute(USERS_PER_PAGE, skip);
        if (!users) {
            const error = new errors_1.CustomError('Not Found Error', 'Aucun utilisateur trouvé', 404);
            next(error);
        }
        res.status(200).json({
            message: 'Users récupérés avec succès',
            users
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUsersWithFiltres = getUsersWithFiltres;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserById).execute(userId);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404);
            throw error;
        }
        res.status(200).json({
            message: 'User récupéré avec succès',
            user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserById).execute(userId);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404);
            throw error;
        }
        res.status(200).json({
            message: 'User récupéré avec succès',
            user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty) {
            console.log(errors.array());
            const error = new errors_1.CustomError('Validation Error', 'Erreur de validation, les données renseignées ne sont pas correctes!', 400, errors.array());
            throw error;
        }
        const userId = req.userId;
        const userData = {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            additionalAddress: req.body.additionalAddress,
            postcode: req.body.postcode,
            town: req.body.town,
            service: req.body.service,
            birthday: req.body.birthday,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber
        };
        const userUpdated = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.UpdateUser).execute(userId, userData);
        if (!userUpdated) {
            const error = new errors_1.CustomError('Not Found Error', `Aucun utilisateur avec l'id ${userId} trouvé!`, 404);
            throw error;
        }
        res.status(200).json({
            message: 'Utilisateur mis à jour avec succès',
            userUpdated
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty) {
            console.log(errors.array());
            const error = new errors_1.CustomError('Validation Error', 'Erreur de validation, les données renseignées ne sont pas correctes!', 400, errors.array());
            throw error;
        }
        const userId = req.userId;
        const password = yield (0, bcrypt_1.hash)(req.body.password, 12);
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.UpdatePassword).execute(userId, password);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `Aucun utilisateur avec l'id ${userId} trouvé!`, 404);
            throw error;
        }
        res.status(200).json({
            message: "Mot de passe mis à jour avec succès"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePassword = updatePassword;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqUserId = req.userId;
        const paramsUserId = req.params.userId;
        if (+reqUserId !== +paramsUserId) {
            const error = new errors_1.CustomError('Authorization Error', 'Vous n\'êtes pas autorisé à modifier cet utilisateur', 401);
            throw error;
        }
        yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.DeleteUser).execute(reqUserId);
        res.status(200).json({
            message: 'Utilisateur supprimé avec succès'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const createFakeUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.CreateFakeUsers).execute();
        res.status(200).json({
            message: "Les utilisateurs de test ont été créés avec succès !"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createFakeUsers = createFakeUsers;
