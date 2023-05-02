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
exports.MongoUser = exports.MongoPost = void 0;
const post_model_1 = require("./post.model");
const user_model_1 = require("./user.model");
const mongo_post_mapper_1 = __importDefault(require("./mongo-post.mapper"));
const mongo_user_mapper_1 = __importDefault(require("./mongo-user.mapper"));
/********************************************************/
/*************************POST***************************/
/********************************************************/
class MongoPost {
    getPosts(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.PostModel.find()
                .limit(limit)
                .populate('UserId', '_id, firstname, lastname, service');
            const posts = result.map(el => new mongo_post_mapper_1.default().mapTo(el));
            return posts;
        });
    }
    getPostsReverse(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.PostModel.find()
                .limit(limit)
                .sort({ id: 'desc' })
                .populate('UserId', '_id, firstname, lastname, service');
            const posts = result.map(el => new mongo_post_mapper_1.default().mapTo(el));
            return posts;
        });
    }
    getPostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.PostModel.findById(postId)
                .populate('UserId', '_id, firstname, lastname, service');
            if (!result) {
                return result;
            }
            const post = new mongo_post_mapper_1.default().mapTo(result);
            return post;
        });
    }
    getUserPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.PostModel.find({
                UserId: userId
            }).populate('user_id', '_id, firstname, lastname, service');
            const posts = result.map(el => new mongo_post_mapper_1.default().mapTo(el));
            return posts;
        });
    }
    createPost(userId, postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.PostModel.create(Object.assign(Object.assign({}, postData), { UserId: userId }));
            const post = new mongo_post_mapper_1.default().mapTo(result);
            return post;
        });
    }
    updatePost(postId, postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_model_1.PostModel.findByIdAndUpdate(postId, Object.assign({}, postData));
            if (!result) {
                return result;
            }
            const post = new mongo_post_mapper_1.default().mapTo(result);
            return post;
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_model_1.PostModel.findByIdAndDelete(postId);
        });
    }
    createFakePosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const fakePosts = [
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 1
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 2
                },
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                    UserId: 2
                }
            ];
            for (let fakePost of fakePosts) {
                yield post_model_1.PostModel.create(Object.assign({}, fakePost));
            }
        });
    }
}
exports.MongoPost = MongoPost;
/********************************************************/
/*************************USER***************************/
/********************************************************/
class MongoUser {
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
                    phoneNumber: '0600000000',
                    confirmed: true,
                    service: 'Commercial',
                    address: '77 avenue de Bouvines',
                    additionalAddress: '',
                    postcode: '34200',
                    town: 'Sète',
                    creationDate: '2023-04-17 18:14:29'
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
                    town: 'Sète',
                    creationDate: '2023-02-14 11:14:29'
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
                    town: 'Sète',
                    creationDate: '2023-01-02 12:32:29'
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
                    town: 'Sète',
                    creationDate: '2022-11-05 18:14:29'
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
                    town: 'Sète',
                    creationDate: '2023-04-17 18:14:29'
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
                    town: 'Sète',
                    creationDate: '2023-04-17 18:14:29'
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
                    town: 'Sète',
                    creationDate: '2023-02-14 11:14:29'
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
                    town: 'Sète',
                    creationDate: '2023-01-02 12:32:29'
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
                    town: 'Sète',
                    creationDate: '2022-11-05 18:14:29'
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
                    town: 'Sète',
                    creationDate: '2023-04-17 18:14:29'
                }
            ];
            for (let fakeUser of fakeUsers) {
                yield user_model_1.UserModel.create(Object.assign({}, fakeUser));
            }
        });
    }
    getUsers(limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.find()
                .limit(limit)
                .skip(skip);
            const users = result.map(el => new mongo_user_mapper_1.default().mapTo(el));
            return users;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.findById(userId);
            if (!result) {
                return result;
            }
            const user = new mongo_user_mapper_1.default().mapTo(result);
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.findOne({
                email
            });
            if (!result) {
                return result;
            }
            const user = new mongo_user_mapper_1.default().mapTo(result);
            return user;
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.create(Object.assign({}, userData));
            const user = new mongo_user_mapper_1.default().mapTo(result);
            return user;
        });
    }
    updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.findByIdAndUpdate(userId, Object.assign({}, userData));
            if (!result) {
                return result;
            }
            const user = new mongo_user_mapper_1.default().mapTo(result);
            return user;
        });
    }
    confirmInscription(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findById(userId);
            if (!user) {
                return user;
            }
            user.confirmed = true;
            const userGeneric = new mongo_user_mapper_1.default().mapTo(user);
            return userGeneric;
        });
    }
    updatePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.findByIdAndUpdate(userId, {
                password
            });
            if (!result) {
                return result;
            }
            const user = new mongo_user_mapper_1.default().mapTo(result);
            return user;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_model_1.PostModel.findByIdAndDelete(userId);
        });
    }
}
exports.MongoUser = MongoUser;
