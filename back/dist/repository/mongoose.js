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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoAuthRepo = exports.MongoUserRepo = exports.MongoPostRepo = void 0;
const post_1 = __importDefault(require("../models/mongoose/post"));
const user_1 = __importDefault(require("../models/mongoose/user"));
class MongoPostRepo {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_1.default.find();
        });
    }
    getPostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_1.default.findById(postId);
        });
    }
    createPost(title, content, imageUrl, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = new post_1.default({
                title,
                content,
                imageUrl,
                creator
            });
            const savedPost = yield post.save({ timestamps: { createdAt: true, updatedAt: false } });
            return savedPost;
        });
    }
    // Utiliser un model mongoose comme type ??
    updatePost(post, title, content, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            post.title = title;
            post.content = content;
            post.imageUrl = imageUrl;
            const postUpdated = yield post.save({ timestamps: { createdAt: false, updatedAt: true } });
            return postUpdated;
        });
    }
    deltePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_1.default.deleteOne({ _id: postId });
        });
    }
}
exports.MongoPostRepo = MongoPostRepo;
class MongoUserRepo {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.find();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findById(userId);
        });
    }
    updateUser(user, firstname, lastname, service) {
        return __awaiter(this, void 0, void 0, function* () {
            user.firstname = firstname;
            user.lastname = lastname;
            user.service = service;
            return yield user.save({ timestamps: { createdAt: false, updatedAt: true } });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.deleteOne({ _id: userId });
        });
    }
}
exports.MongoUserRepo = MongoUserRepo;
class MongoAuthRepo {
    createUser(email, password, firstname, lastname, service) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_1.default({
                email,
                password,
                firstname,
                lastname,
                service
            });
            const userRegister = yield user.save({ timestamps: { createdAt: true, updatedAt: false } });
        });
    }
    confirmInscription(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.confirmed = true;
            yield user.save({ timestamps: false });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findOne({ email });
        });
    }
    updatePassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = password;
            yield user.save({ timestamps: false });
        });
    }
}
exports.MongoAuthRepo = MongoAuthRepo;
