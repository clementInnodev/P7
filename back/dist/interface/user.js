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
exports.DeleteUser = exports.UpdateUser = exports.GetUserById = exports.GetUsers = void 0;
class GetUsers {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    execute(USERS_PER_PAGE, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.postRepo.getUsers(USERS_PER_PAGE, skip);
            return users;
        });
    }
}
exports.GetUsers = GetUsers;
class GetUserById {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.postRepo.getUserById(userId);
            return user;
        });
    }
}
exports.GetUserById = GetUserById;
class UpdateUser {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    execute(user, firstname, lastname, imageUrl, service, address, additionalAddress, postcode, town) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdated = yield this.postRepo.updateUser(user, firstname, lastname, imageUrl, service, address, additionalAddress, postcode, town);
            return userUpdated;
        });
    }
}
exports.UpdateUser = UpdateUser;
class DeleteUser {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.postRepo.deleteUser(userId);
            return user;
        });
    }
}
exports.DeleteUser = DeleteUser;
