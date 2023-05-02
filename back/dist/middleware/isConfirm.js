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
exports.isConfirm = void 0;
const errors_1 = require("../utils/errors");
const use_case_types_1 = require("../core/types/use-case.types");
const inversify_config_1 = require("../utils/inversify.config");
const isConfirm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserByEmail).execute(email);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `Aucun utilisateur trouvé !`, 404);
            throw error;
        }
        if (!user.confirmed) {
            const error = new errors_1.CustomError('Authorization Error', 'Vous n\'avez pas confirmé votre inscription, un email vous a été envoyé pour la confirmer', 401);
            throw error;
        }
    }
    catch (error) {
        next(error);
    }
    next();
});
exports.isConfirm = isConfirm;
