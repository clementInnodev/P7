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
exports.verifyUserLoged = exports.resetPassword = exports.forgottenPassword = exports.login = exports.confirmSignup = exports.signup = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const express_validator_1 = require("express-validator");
const secret_key_1 = require("../utils/secret-key");
const nodemailer_1 = require("../utils/nodemailer");
const errors_1 = require("../utils/errors");
const inversify_config_1 = require("../utils/inversify.config");
const use_case_types_1 = require("../core/types/use-case.types");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new errors_1.CustomError('Validation Error', 'Erreur de validation, les données renseignées ne sont pas correctes!', 400, errors.array());
            throw error;
        }
        const userData = {
            email: req.body.email,
            password: yield (0, bcrypt_1.hash)(req.body.password, 12),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            service: req.body.service,
            additionalAddress: req.body.additionalAddress,
            address: req.body.address,
            birthday: req.body.birthday,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            postcode: req.body.postcode,
            town: req.body.town
        };
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.CreateUser).execute(userData);
        const token = (0, jsonwebtoken_1.sign)({
            userId: user.id
        }, secret_key_1.secretKey);
        nodemailer_1.transporter.sendMail({
            to: req.body.email,
            from: 'Groupomania@outlook.fr',
            subject: 'Pour confirmer votre inscription',
            html: `
            <a href="http://localhost:4200/auth/confirm/${token}">Veuillez cliquer sur le lien ci-dessous afin de confirmer votre inscription au réseau Groupomania</a>
            `
        }, (error, info) => {
            if (error) {
                console.log('NodeMailer error', error);
            }
            else {
                console.log('NodeMailer info', info);
            }
        });
        res.status(201).json({
            message: `${req.body.firstname} ${req.body.lastname}, votre compte a été créé avec succès`,
            user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const confirmSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, jsonwebtoken_1.verify)(req.params.token, secret_key_1.secretKey);
        if (!token) {
            const error = new errors_1.CustomError('Authorization Error', 'Impossible de confirmer votre inscription, token invalide', 401);
            throw error;
        }
        const userId = token.userId;
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserById).execute(userId);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404);
            throw error;
        }
        if (user.confirmed) {
            res.status(302).json({
                message: 'Votre inscription est déjà validée'
            });
        }
        else {
            const userConfirmed = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.ConfirmationInscription).execute(user.id);
            if (!userConfirmed) {
                const error = new errors_1.CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404);
                throw error;
            }
            nodemailer_1.transporter.sendMail({
                to: userConfirmed.email,
                from: 'Groupomania@outlook.fr',
                subject: 'Confirmation d\'inscription',
                html: `
                <h1>Confirmation d'inscription</h1>
                <p>Félicitation, votre inscription est confirmée !</p>
                <p>Vous avez maintenant accès au réseau de Groupomania</p>
                `
            }, (error, info) => {
                if (error) {
                    console.log('NodeMailer error', error);
                }
                else {
                    console.log('NodeMailer info', info);
                }
            });
            res.status(200).json({
                message: `Inscription validée`,
                user: userConfirmed
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.confirmSignup = confirmSignup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            const error = new errors_1.CustomError('Validation Error', 'Erreur de validation, les données renseignées ne sont pas correctes!', 400, errors.array());
            throw error;
        }
        const email = req.body.email;
        const password = req.body.password;
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserByEmail).execute(email);
        if (!user) {
            //Message d'erreur volontairement vague et ne donnant aucune information quand à la présence ou non d'un utilisateur inscrit avec cette adresse email
            const error = new errors_1.CustomError("Authorization Error", 'Paire email / mot de passe incorrecte', 401);
            throw error;
        }
        const match = yield (0, bcrypt_1.compare)(password, user.password);
        if (!match) {
            const error = new errors_1.CustomError("Authorization Error", 'Paire email / mot de passe incorrecte', 401);
            throw error;
        }
        const userId = user.id.toString();
        const token = (0, jsonwebtoken_1.sign)({
            userId
        }, secret_key_1.secretKey, {
            expiresIn: '1h'
        });
        res.status(200).json({
            message: `${user.firstname} ${user.lastname} connecté avec succès`,
            token,
            user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const forgottenPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            const error = new errors_1.CustomError('Validation Error', 'Erreur de validation, les données renseignées ne sont pas correctes!', 400, errors.array());
            throw error;
        }
        const email = req.body.email;
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserByEmail).execute(email);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `L'utilisateur avec l'email ${email} n'existe pas`, 404);
            throw error;
        }
        const token = (0, jsonwebtoken_1.sign)({
            userId: user.id
        }, secret_key_1.secretKey, {
            expiresIn: '1h'
        });
        nodemailer_1.transporter.sendMail({
            to: user.email,
            from: 'Groupomania@outlook.fr',
            subject: 'Mot de passe oublié',
            html: `
            <a href="http://localhost:4200/auth/reset-password/${token}">Veuillez cliquer sur le lien ci-dessous pour modifier votre mot de passe</a>
            `
        }, (error, info) => {
            if (error) {
                console.log('NodeMailer error', error);
            }
            else {
                console.log('NodeMailer info', info);
            }
        });
        res.status(200).json({
            message: `Email de modification de mot de passe envoyé avec succès à l'adresse mail ${user.email}`
        });
    }
    catch (error) {
        next(error);
    }
});
exports.forgottenPassword = forgottenPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            const error = new errors_1.CustomError('Validation Error', 'Erreur de validation, les données renseignées ne sont pas correctes!', 400, errors.array());
            throw error;
        }
        const token = (0, jsonwebtoken_1.verify)(req.body.token, secret_key_1.secretKey);
        if (!token) {
            const error = new errors_1.CustomError('Authorization Error', 'Impossible de modifier votre mot de passe, token invalide', 401);
            throw error;
        }
        const userId = token.userId;
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserById).execute(userId);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404);
            throw error;
        }
        const newPassword = yield (0, bcrypt_1.hash)(req.body.password, 12);
        yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.UpdatePassword).execute(userId, newPassword);
        res.status(200).json({
            message: 'Mot de passe modifié avec succès'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
const verifyUserLoged = (req, res, next) => {
    const token = req.params.token;
    let message;
    try {
        (0, jsonwebtoken_1.verify)(token, secret_key_1.secretKey);
        message = 'Token valide';
        res.status(200).json({ message });
    }
    catch (error) {
        message = 'Token invalide';
        res.status(401).json({ message });
    }
};
exports.verifyUserLoged = verifyUserLoged;
