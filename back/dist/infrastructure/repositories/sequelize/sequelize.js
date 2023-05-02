"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.SequelizeUser = exports.SequelizeLike = exports.SequelizePost = void 0;
const post_model_1 = require("./post.model");
const user_model_1 = require("./user.model");
const post_user_like_model_1 = require("./post-user-like.model");
const sequelize_post_mapper_1 = require("./sequelize-post.mapper");
const sequelize_user_mapper_1 = require("./sequelize-user.mapper");
const inversify_1 = require("inversify");
const sequelize_post_user_mapper_1 = require("./sequelize-post-user.mapper");
const bcrypt_1 = require("bcrypt");
/********************************************************/
/*************************POST***************************/
/********************************************************/
let SequelizePost = class SequelizePost {
    getPosts(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.Post.findAll({
                include: {
                    model: user_model_1.User,
                    attributes: [
                        'firstname',
                        'lastname',
                        'service'
                    ]
                },
                limit
            });
            console.log(result);
            const posts = result.map(el => new sequelize_post_user_mapper_1.SequelizePostUserMapper().mapTo(el));
            return posts;
        });
    }
    //@ts-ignore
    getPostsReverse(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.Post.findAll({
                include: [
                    {
                        model: user_model_1.User,
                        attributes: [
                            'firstname',
                            'lastname',
                            'service'
                        ]
                    }
                ],
                limit,
                order: [
                    ['id', 'DESC']
                ]
            });
            const posts = result.map(el => new sequelize_post_user_mapper_1.SequelizePostUserMapper().mapTo(el));
            return posts;
        });
    }
    getPostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.Post.findByPk(postId);
            if (!result) {
                return result;
            }
            const post = new sequelize_post_mapper_1.SequelizePostMapper().mapTo(result);
            return post;
        });
    }
    getUserPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.Post.findAll({
                where: {
                    UserId: userId
                }
            });
            const posts = result.map(el => new sequelize_post_mapper_1.SequelizePostMapper().mapTo(el));
            return posts;
        });
    }
    createPost(userId, postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.Post.create(Object.assign(Object.assign({}, postData), { UserId: userId }));
            const post = new sequelize_post_mapper_1.SequelizePostMapper().mapTo(result);
            return post;
        });
    }
    updatePost(postId, post) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.Post.findByPk(postId);
            if (!result) {
                return result;
            }
            result.set(Object.assign({}, post));
            yield result.save();
            const postUpdated = new sequelize_post_mapper_1.SequelizePostMapper().mapTo(result);
            return postUpdated;
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_model_1.Post.destroy({
                where: {
                    id: postId
                }
            });
        });
    }
    createFakePosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const fakePosts = [
                {
                    title: 'Lorem ipsum.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum.`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor.',
                    content: `Lorem ipsum dolor sit amet.`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto.`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi.`,
                    UserId: 1
                },
                {
                    title: 'Lorem.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat.`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor sit amet.',
                    content: `Lorem ipsum dolor sit amet.`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique.`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor sit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing.`,
                    UserId: 2
                },
                {
                    title: 'Lorem.',
                    content: `Lorem ipsum dolor.`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, numquam blanditiis harum quisquam eius sed odit fugiat.`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga.`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae.`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum!`,
                    UserId: 1
                }
            ];
            for (let fakePost of fakePosts) {
                yield post_model_1.Post.create(Object.assign({}, fakePost));
            }
        });
    }
};
SequelizePost = __decorate([
    (0, inversify_1.injectable)()
], SequelizePost);
exports.SequelizePost = SequelizePost;
/********************************************************/
/*************************LIKE***************************/
/********************************************************/
let SequelizeLike = class SequelizeLike {
    like(UserId, PostId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_user_like_model_1.PostUserLike.create({
                PostId,
                UserId
            });
        });
    }
    unlike(UserId, PostId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_user_like_model_1.PostUserLike.destroy({
                where: {
                    PostId,
                    UserId
                }
            });
        });
    }
    verifyExistingLike(UserId, PostId) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = yield post_user_like_model_1.PostUserLike.findOne({
                where: {
                    PostId,
                    UserId
                }
            });
            if (!like) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    countPostLike(PostId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield post_user_like_model_1.PostUserLike.count({
                where: {
                    PostId
                }
            });
            return count;
        });
    }
};
SequelizeLike = __decorate([
    (0, inversify_1.injectable)()
], SequelizeLike);
exports.SequelizeLike = SequelizeLike;
/********************************************************/
/*************************USER***************************/
/********************************************************/
let SequelizeUser = class SequelizeUser {
    createFakeUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const fakeUsers = [
                {
                    email: 'guillaume.gamelin@test.test',
                    password: 'Test123!',
                    firstname: 'Guillaume',
                    lastname: 'Gamelin',
                    birthday: '1978-12-05',
                    gender: 'Homme',
                    phoneNumber: '0654123561',
                    confirmed: true,
                    service: 'Commercial',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'gustave-belisle@test.test',
                    password: 'Test123!',
                    firstname: 'Gustave',
                    lastname: 'Belisle',
                    birthday: '1978-12-05',
                    gender: 'Homme',
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Comptable',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'amelie-emond@test.test',
                    password: 'Test123!',
                    firstname: 'Amélie',
                    lastname: 'Emond',
                    birthday: '1978-12-05',
                    gender: 'Femme',
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Ressources humaines',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'caroline-doiron@test.test',
                    password: 'Test123!',
                    firstname: 'Caroline',
                    lastname: 'Doiron',
                    birthday: '1978-12-05',
                    gender: 'Femme',
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Direction',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'christian-gingras@test.test',
                    password: 'Test123!',
                    firstname: 'Christian',
                    lastname: 'Gingras',
                    birthday: '1978-12-05',
                    gender: 'Homme',
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Logistique',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'olivier-belair@test.test',
                    password: 'Test123!',
                    firstname: 'Olivier',
                    lastname: 'Bélair',
                    birthday: '1978-12-05',
                    gender: 'Homme',
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Commercial',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'gaetan-couet@test.test',
                    password: 'Test123!',
                    firstname: 'Gaetan',
                    lastname: 'Couet',
                    birthday: '1978-12-05',
                    gender: 'Homme',
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Comptable',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'christiane-langlois@test.test',
                    password: 'Test123!',
                    firstname: 'Christiane',
                    lastname: 'Langlois',
                    birthday: '1978-12-05',
                    gender: 'Femme',
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Ressources humaines',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'laurette-tachel@test.test',
                    password: 'Test123!',
                    firstname: 'Laurette',
                    lastname: 'Tachel',
                    birthday: '1978-12-05',
                    gender: 'Femme',
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Direction',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'yves-lanteigne@test.test',
                    password: 'Test123!',
                    firstname: 'Yves',
                    lastname: 'Lanteigne',
                    birthday: '1978-12-05',
                    gender: 'Homme',
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Logistique',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète'
                },
                {
                    email: 'admin@admin.fr',
                    password: 'Test123!',
                    firstname: 'Admin',
                    lastname: 'Admin',
                    birthday: '2000-01-01',
                    gender: 'Homme',
                    phoneNumber: '0000000000',
                    confirmed: true,
                    service: 'Direction',
                    address: 'admin',
                    additionalAddress: '',
                    postcode: '00000',
                    town: 'admin',
                    admin: true
                }
            ];
            for (let fakeUser of fakeUsers) {
                yield user_model_1.User.create(Object.assign(Object.assign({}, fakeUser), { password: yield (0, bcrypt_1.hash)(fakeUser.password, 12) }));
            }
        });
    }
    getUsers(limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            if (+limit !== 0 && +skip !== 0) {
                result = yield user_model_1.User.findAll({
                    limit,
                    offset: skip
                });
            }
            else {
                result = yield user_model_1.User.findAll();
            }
            const users = result.map(el => new sequelize_user_mapper_1.SequelizeUserMapper().mapTo(el));
            return users;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.User.findByPk(userId);
            if (!result) {
                return result;
            }
            const user = new sequelize_user_mapper_1.SequelizeUserMapper().mapTo(result);
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.User.findOne({
                where: {
                    email
                }
            });
            if (!result) {
                return result;
            }
            const user = new sequelize_user_mapper_1.SequelizeUserMapper().mapTo(result);
            return user;
        });
    }
    updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.User.findByPk(userId);
            if (!result) {
                return result;
            }
            result.set(Object.assign({}, userData));
            yield result.save();
            const user = new sequelize_user_mapper_1.SequelizeUserMapper().mapTo(result);
            return user;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.User.destroy({
                where: {
                    id: userId
                }
            });
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.User.create(Object.assign({}, userData));
            const user = new sequelize_user_mapper_1.SequelizeUserMapper().mapTo(result);
            return user;
        });
    }
    updatePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.User.findByPk(userId);
            if (!result) {
                return result;
            }
            result.password = password;
            yield result.save();
            const user = new sequelize_user_mapper_1.SequelizeUserMapper().mapTo(result);
            return user;
        });
    }
    confirmInscription(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findByPk(userId);
            if (!user) {
                return user;
            }
            user.confirmed = true;
            yield user.save();
            const userGeneric = new sequelize_user_mapper_1.SequelizeUserMapper().mapTo(user);
            return userGeneric;
        });
    }
};
SequelizeUser = __decorate([
    (0, inversify_1.injectable)()
], SequelizeUser);
exports.SequelizeUser = SequelizeUser;
