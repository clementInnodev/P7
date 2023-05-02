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
exports.createFakePosts = exports.deletePost = exports.updatePost = exports.createPost = exports.getUserPosts = exports.getPost = exports.getPostsReverse = exports.getPosts = void 0;
const express_validator_1 = require("express-validator");
const socket_1 = require("../utils/socket");
const errors_1 = require("../utils/errors");
const inversify_config_1 = require("../utils/inversify.config");
const use_case_types_1 = require("../core/types/use-case.types");
const file_helper_1 = require("../utils/file-helper");
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const POSTS_PER_PAGE = req.query.limit_per_page ? +req.query.limit_per_page : 20;
        const page = req.query.page ? +req.query.page : 1;
        const posts = yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.GetPosts).execute(POSTS_PER_PAGE);
        res.status(200).json({
            message: 'Posts récupérés avec succès',
            posts
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPosts = getPosts;
const getPostsReverse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const POSTS_PER_PAGE = req.query.limit_per_page ? +req.query.limit_per_page : 20;
        const page = req.query.page ? +req.query.page : 1;
        const posts = yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.GetPostsReverse).execute(POSTS_PER_PAGE);
        res.status(200).json({
            message: 'Posts récupérés avec succès',
            posts
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPostsReverse = getPostsReverse;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    try {
        const post = yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.GetPostById).execute(postId);
        if (!post) {
            const error = new errors_1.CustomError('Not Found Error', `Aucun post trouvé avec l'id ${postId}`, 404);
            throw error;
        }
        res.status(200).json({
            message: `Post ${postId} trouvé avec succès`,
            post
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPost = getPost;
const getUserPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const posts = yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.GetUserPosts).execute(userId);
        res.status(200).json({
            message: 'Posts récupérés avec succès',
            posts
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserPosts = getUserPosts;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            const error = new errors_1.CustomError('Validation Error', 'Erreur de validation, les données renseignées ne sont pas correctes!', 400, errors.array());
            throw error;
        }
        const userId = req.userId;
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserById).execute(userId);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404);
            throw error;
        }
        let postData = {
            content: req.body.content
        };
        if (req.body.title && req.body.title !== 'undefined') {
            postData = Object.assign(Object.assign({}, postData), { title: req.body.title });
        }
        if (req.file) {
            postData = Object.assign(Object.assign({}, postData), { imageUrl: req.file.path });
        }
        const post = yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.CreatePost).execute(userId, postData);
        const io = (0, socket_1.getIO)();
        io.emit('posts', {
            action: 'create',
            post
        });
        res.status(201).json({
            message: 'Post ajouté avec succès',
            post
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            const error = new errors_1.CustomError('Validation Error', 'Erreur de validation, les données renseignées ne sont pas correctes!', 400, errors.array());
            throw error;
        }
        const userId = req.userId;
        const postId = req.params.postId;
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserById).execute(userId);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404);
            throw error;
        }
        const post = yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.GetPostById).execute(postId);
        if (!post) {
            const error = new errors_1.CustomError('Not Found Error', `Le post avec l'id ${postId} n'existe pas`, 404);
            throw error;
        }
        if (post.UserId.toString() !== user.id.toString() && !user.admin) {
            const error = new errors_1.CustomError('Authorization Error', 'Vous n\'êtes pas autorisé à modifier ce post', 401);
            throw error;
        }
        let postData = {
            content: req.body.content,
            updateDate: req.body.updateDate
        };
        if (req.body.title && req.body.title !== 'undefined') {
            postData = Object.assign(Object.assign({}, postData), { title: req.body.title });
        }
        if (req.body.imageUrl && req.body.imageUrl === 'delete') {
            postData = Object.assign(Object.assign({}, postData), { imageUrl: null });
        }
        if (req.file) {
            postData = Object.assign(Object.assign({}, postData), { imageUrl: req.file.path });
        }
        if (post.imageUrl && (req.file || req.body.imageUrl === 'delete')) {
            (0, file_helper_1.deleteFile)(post.imageUrl);
        }
        const postUpdated = yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.UpdatePost).execute(post.id, postData);
        const io = (0, socket_1.getIO)();
        io.emit('posts', {
            action: 'update',
            postUpdated
        });
        res.status(200).json({
            message: 'Post mis à jour avec succès',
            postUpdated
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const postId = req.params.postId;
    try {
        const user = yield inversify_config_1.container.get(use_case_types_1.USER_USE_CASE.GetUserById).execute(userId);
        if (!user) {
            const error = new errors_1.CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404);
            throw error;
        }
        const post = yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.GetPostById).execute(postId);
        if (!post) {
            const error = new errors_1.CustomError('Not Found Error', `Le post avec l'id ${postId} n'existe pas`, 404);
            throw error;
        }
        if (post.UserId.toString() !== user.id.toString() && !user.admin) {
            const error = new errors_1.CustomError('Authorization Error', 'Vous n\'êtes pas autorisé à supprimer ce post', 401);
            throw error;
        }
        if (post.imageUrl) {
            (0, file_helper_1.deleteFile)(post.imageUrl);
        }
        inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.DeletePost).execute(postId);
        const io = (0, socket_1.getIO)();
        io.emit('posts', {
            action: 'delete'
        });
        res.status(200).json({
            message: 'Post supprimé avec succès'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
const createFakePosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield inversify_config_1.container.get(use_case_types_1.POST_USE_CASE.CreateFakePosts).execute();
        res.status(200).json({
            message: "Les posts de test ont été créés avec succès !"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createFakePosts = createFakePosts;
