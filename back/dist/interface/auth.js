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
exports.UpdatePassword = exports.GetUserByEmail = exports.ConfirmInscription = exports.CreateUser = void 0;
class CreateUser {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    execute(email, password, firstname, lastname, imageUrl, service, address, additionalAddress, postcode, town) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authRepo.createUser(email, password, firstname, lastname, imageUrl, service, address, additionalAddress, postcode, town);
            return user;
        });
    }
}
exports.CreateUser = CreateUser;
class ConfirmInscription {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    execute(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdated = yield this.authRepo.confirmInscription(user);
            return userUpdated;
        });
    }
}
exports.ConfirmInscription = ConfirmInscription;
class GetUserByEmail {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authRepo.getUserByEmail(email);
            return user;
        });
    }
}
exports.GetUserByEmail = GetUserByEmail;
class UpdatePassword {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    execute(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdated = yield this.authRepo.updatePassword(user, password);
            return userUpdated;
        });
    }
}
exports.UpdatePassword = UpdatePassword;
