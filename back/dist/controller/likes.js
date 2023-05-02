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
exports.numberOfLikes = exports.alreadyLiked = exports.like = void 0;
const inversify_config_1 = require("../utils/inversify.config");
const use_case_types_1 = require("../core/types/use-case.types");
const errors_1 = require("../utils/errors");
const like = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const postId = req.body.postId;
        const post = yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.GetPostById).execute(postId);
        if (!post) {
            const error = new errors_1.CustomError("Not Found Error", `Le post avec l'id ${postId} n'existe pas.`, 404);
            throw error;
        }
        let message;
        const alreadyLiked = yield inversify_config_1.container.get(use_case_types_1.LIKE_USE_CASE.VerifyExistingLike).execute(userId, postId);
        if (alreadyLiked) {
            yield inversify_config_1.container.get(use_case_types_1.LIKE_USE_CASE.UnlikePost).execute(userId, postId);
            message = 'Votre like a été retiré.';
        }
        else {
            yield inversify_config_1.container.get(use_case_types_1.LIKE_USE_CASE.LikePost).execute(userId, postId);
            message = 'Votre like a été ajouté';
        }
        res.status(200).json({ message });
    }
    catch (error) {
        next(error);
    }
});
exports.like = like;
const alreadyLiked = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const postId = req.params.postId;
        const alreadyLiked = yield inversify_config_1.container.get(use_case_types_1.LIKE_USE_CASE.VerifyExistingLike).execute(userId, postId);
        res.status(200).json({ alreadyLiked });
    }
    catch (error) {
        next(error);
    }
});
exports.alreadyLiked = alreadyLiked;
const numberOfLikes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const numberOfLikes = yield inversify_config_1.container.get(use_case_types_1.LIKE_USE_CASE.CountPostLikes).execute(postId);
        res.status(200).json({ numberOfLikes });
    }
    catch (error) {
        next(error);
    }
});
exports.numberOfLikes = numberOfLikes;
