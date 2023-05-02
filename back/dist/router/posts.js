"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const posts_1 = require("../controller/posts");
const likes_1 = require("../controller/likes");
const isAuth_1 = require("../middleware/isAuth");
exports.router = (0, express_1.Router)();
exports.router.get('/posts', isAuth_1.isAuth, posts_1.getPosts);
exports.router.get('/posts-reverse', isAuth_1.isAuth, posts_1.getPostsReverse);
exports.router.get('/post/:postId', isAuth_1.isAuth, posts_1.getPost);
exports.router.get('/user-posts', isAuth_1.isAuth, posts_1.getUserPosts);
exports.router.post('/post', isAuth_1.isAuth, [
    (0, express_validator_1.body)('title')
        .trim()
        .escape()
        .isLength({ max: 50 }).withMessage('Veuillez renseigner un titre valide (50 caractères maximum)'),
    (0, express_validator_1.body)('content')
        .trim()
        .escape()
        .isLength({ min: 2, max: 1000 }).withMessage('Veuillez renseigner un contenu valide (entre 2 et 1000 caractères)')
], posts_1.createPost);
exports.router.put('/post/:postId', isAuth_1.isAuth, [
    (0, express_validator_1.body)('title')
        .trim()
        .escape()
        .isLength({ max: 50 }).withMessage('Veuillez renseigner un titre valide (50 caractères maximum)'),
    (0, express_validator_1.body)('content')
        .trim()
        .escape()
        .isLength({ min: 2, max: 1000 }).withMessage('Veuillez renseigner un contenu valide (entre 2 et 1000 caractères)'),
    (0, express_validator_1.body)('imageUrl')
        .trim()
        .escape()
], posts_1.updatePost);
exports.router.delete('/post/:postId', isAuth_1.isAuth, posts_1.deletePost);
exports.router.post('/like', isAuth_1.isAuth, [
    (0, express_validator_1.body)('postId')
        .trim()
        .escape()
], likes_1.like);
exports.router.get('/verify-like/:postId', isAuth_1.isAuth, likes_1.alreadyLiked);
exports.router.get('/count-likes/:postId', isAuth_1.isAuth, likes_1.numberOfLikes);
exports.router.get('/fake-posts', posts_1.createFakePosts);
