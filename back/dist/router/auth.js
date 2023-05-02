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
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controller/auth");
const user_model_1 = require("../infrastructure/repositories/sequelize/user.model");
const isConfirm_1 = require("../middleware/isConfirm");
exports.router = (0, express_1.Router)();
exports.router.post('/signup', [
    (0, express_validator_1.body)('email')
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail().withMessage('n\'est pas une adresse email valide')
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const emailAlreadyUsed = yield user_model_1.User.findOne({
            where: {
                email: value
            }
        });
        if (emailAlreadyUsed) {
            throw new Error('est déjà utilisé');
        }
    })),
    (0, express_validator_1.body)('password', 'n\'est pas un mot de passe valide (6 caractères, 1 majuscule, 1 chiffre, 1 symbole minimum')
        .trim()
        .escape()
        .isStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
    (0, express_validator_1.body)('firstname')
        .trim()
        .escape()
        .isAlpha('fr-FR', { ignore: ' -' }).withMessage('n\'est pas un prénom valide')
        .isLength({ min: 1, max: 30 }).withMessage('n\'est pas un prénom valide (entre 1 et 30 caractères)'),
    (0, express_validator_1.body)('lastname')
        .trim()
        .escape()
        .isAlpha('fr-FR', { ignore: ' -\'' }).withMessage('n\'est pas un nom valide')
        .isLength({ min: 1, max: 30 }).withMessage('n\'est pas un nom valide (entre 1 et 30 caractères)'),
    (0, express_validator_1.body)('service')
        .trim()
        .escape()
        .isLength({ min: 1 }).withMessage('Veuillez renseigner votre service')
        .custom((value, { req }) => {
        const services = ['Comptabilité', 'Ressources humaines', 'Développement', 'Commercial', 'Logistique', 'Direction'];
        const match = services.includes(value);
        if (!match) {
            throw new Error('n\'est pas un service valide');
        }
        return true;
    }),
    (0, express_validator_1.body)('gender')
        .trim()
        .escape()
        .isIn(['Homme', 'Femme']).withMessage('n\'est pas une valeur valide'),
    (0, express_validator_1.body)('phoneNumber')
        .trim()
        .escape()
        .isLength({ min: 10, max: 10 }).withMessage('n\'est pas un numéro de téléphone valide (10 caractères)')
        .isNumeric().withMessage('n\'est pas valide car ne doit contenir que des nombres'),
    (0, express_validator_1.body)('address')
        .trim()
        .escape()
        .isAlphanumeric('fr-FR', { ignore: ' -\'' }).withMessage('n\'est pas une adresse valide')
        .isLength({ min: 1, max: 70 }).withMessage('n\'est pas une adresse valide (entre 1 et 70 caractères)'),
    (0, express_validator_1.body)('additionalAddress')
        .trim()
        .escape()
        .isLength({ max: 70 }).withMessage('n\'est pas un complément d\'adresse valide (70 caractères maximum)'),
    (0, express_validator_1.body)('postcode')
        .trim()
        .escape()
        .isLength({ min: 5, max: 5 }).withMessage('n\'est pas un code postal valide (5 caractères)')
        .isNumeric().withMessage('n\'est pas valide car ne doit contenir que des nombres'),
    (0, express_validator_1.body)('town')
        .trim()
        .escape()
        .isAlpha('fr-FR', { ignore: ' -\'' }).withMessage('n\'est pas une ville valide')
        .isLength({ max: 45, min: 1 }).withMessage('n\'est pas une ville valide (entre 1 et 45 caractères)'),
    (0, express_validator_1.body)('birthday')
        .trim()
        .escape()
        .isDate().withMessage('n\'est pas une date valide')
        .custom((value, { req }) => {
        const birthday = new Date(Date.parse(value));
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        const dateObj = new Date(formattedDate);
        if (birthday === dateObj || birthday > dateObj) {
            throw new Error('n\'est pas une date d\'anniverssaire valide. Elle doit être antérieur à la date d\'aujourd\'hui');
        }
        return true;
    })
], auth_1.signup);
exports.router.post('/login', isConfirm_1.isConfirm, [
    (0, express_validator_1.body)('email')
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail().withMessage('Veuillez renseigner une adresse email valide'),
    (0, express_validator_1.body)('password')
        .trim()
        .escape()
], auth_1.login);
exports.router.get('/confirm-signup/:token', auth_1.confirmSignup);
// email dans le body / enverra un lien par mail / mail contenant un lien avec un token qui lui même contiendra l'userId
exports.router.post('/forgotten-password', (0, express_validator_1.body)('email')
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail().withMessage('Veuillez renseigner une adresse email valide'), auth_1.forgottenPassword);
// double input password / vérifiera le match / mettra à jour en bdd
exports.router.put('/reset-password', [
    (0, express_validator_1.body)('password', 'Veuillez renseigner un mot de passe valide (6 caractères, 1 majuscule, 1 chiffre, 1 symbole minimum')
        .trim()
        .escape()
        .isStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
    (0, express_validator_1.body)('confirmPassword')
        .trim()
        .escape()
        .custom((value, { req }) => {
        console.log(req.body.confirmationPassword, req.body.password);
        if (req.body.confirmationPassword !== req.body.password) {
            throw new Error('doivent être identiques');
            //throw new CustomError('Les mots de passe doivent être identique', 400)
        }
        return true;
    })
], auth_1.resetPassword);
exports.router.get('/loged/:token', auth_1.verifyUserLoged);
