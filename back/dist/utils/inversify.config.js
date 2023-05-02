"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const repository_types_1 = require("../core/types/repository.types");
const use_case_types_1 = require("../core/types/use-case.types");
const db_types_1 = require("../core/types/db.types");
const sequelize_1 = require("../infrastructure/repositories/sequelize/sequelize");
const database_1 = require("../infrastructure/db/database");
const create_post_use_case_1 = require("../core/use-cases/posts/create-post.use-case");
const update_post_use_case_1 = require("../core/use-cases/posts/update-post.use-case");
const delete_post_use_case_1 = require("../core/use-cases/posts/delete-post.use-case");
const get_posts_use_case_1 = require("../core/use-cases/posts/get-posts.use-case");
const get_user_posts_use_case_1 = require("../core/use-cases/posts/get-user-posts.use-case");
const get_post_by_id_use_case_1 = require("../core/use-cases/posts/get-post-by-id.use-case");
const get_posts_reverse_use_case_1 = require("../core/use-cases/posts/get-posts-reverse.use-case");
const create_fake_posts_use_case_1 = require("../core/use-cases/posts/create-fake-posts.use-case");
const create_user_use_case_1 = require("../core/use-cases/users/create-user.use-case");
const update_user_use_case_1 = require("../core/use-cases/users/update-user.use-case");
const get_users_use_case_1 = require("../core/use-cases/users/get-users.use-case");
const get_user_by_id_use_case_1 = require("../core/use-cases/users/get-user-by-id.use-case");
const delete_user_use_case_1 = require("../core/use-cases/users/delete-user.use-case");
const confirm_inscription_use_case_1 = require("../core/use-cases/users/confirm-inscription.use-case");
const get_user_by_email_use_case_1 = require("../core/use-cases/users/get-user-by-email.use-case");
const update_password_use_case_1 = require("../core/use-cases/users/update-password.use-case");
const create_fake_users_use_case_1 = require("../core/use-cases/users/create-fake-users.use-case");
const like_use_case_1 = require("../core/use-cases/likes/like.use-case");
const unlike_use_case_1 = require("../core/use-cases/likes/unlike.use-case");
const verify_existing_like_use_case_1 = require("../core/use-cases/likes/verify-existing-like.use.case");
const count_post_likes_use_case_1 = require("../core/use-cases/likes/count-post-likes.use-case");
exports.container = new inversify_1.Container({
    defaultScope: "Transient" // à vérifier
});
// DATABASE
exports.container.bind(db_types_1.DATABASE_CONFIG).toConstantValue({ type: 'mysql' });
exports.container.bind(db_types_1.DATABASE).to(database_1.Database); //.inSingletonScope()
// REPOSITORIES
exports.container.bind(repository_types_1.REPOSITORIES.Post).to(sequelize_1.SequelizePost);
exports.container.bind(repository_types_1.REPOSITORIES.User).to(sequelize_1.SequelizeUser);
exports.container.bind(repository_types_1.REPOSITORIES.Like).to(sequelize_1.SequelizeLike);
// POST - USE - CASE
exports.container.bind(use_case_types_1.POST_USE_CASE.CreatePost).to(create_post_use_case_1.CreatePost);
exports.container.bind(use_case_types_1.POST_USE_CASE.UpdatePost).to(update_post_use_case_1.UpdatePost);
exports.container.bind(use_case_types_1.POST_USE_CASE.DeletePost).to(delete_post_use_case_1.DeletePost);
exports.container.bind(use_case_types_1.POST_USE_CASE.GetPosts).to(get_posts_use_case_1.GetPosts);
exports.container.bind(use_case_types_1.POST_USE_CASE.GetPostsReverse).to(get_posts_reverse_use_case_1.GetPostsReverse);
exports.container.bind(use_case_types_1.POST_USE_CASE.GetUserPosts).to(get_user_posts_use_case_1.GetUserPosts);
exports.container.bind(use_case_types_1.POST_USE_CASE.GetPostById).to(get_post_by_id_use_case_1.GetPostById);
exports.container.bind(use_case_types_1.POST_USE_CASE.CreateFakePosts).to(create_fake_posts_use_case_1.CreateFakePosts);
// USER - USE - CASE
exports.container.bind(use_case_types_1.USER_USE_CASE.CreateUser).to(create_user_use_case_1.CreateUser);
exports.container.bind(use_case_types_1.USER_USE_CASE.UpdateUser).to(update_user_use_case_1.UpdateUser);
exports.container.bind(use_case_types_1.USER_USE_CASE.GetUsers).to(get_users_use_case_1.GetUsers);
exports.container.bind(use_case_types_1.USER_USE_CASE.GetUserById).to(get_user_by_id_use_case_1.GetUserById);
exports.container.bind(use_case_types_1.USER_USE_CASE.DeleteUser).to(delete_user_use_case_1.DeleteUser);
exports.container.bind(use_case_types_1.USER_USE_CASE.ConfirmationInscription).to(confirm_inscription_use_case_1.ConfirmInscription);
exports.container.bind(use_case_types_1.USER_USE_CASE.GetUserByEmail).to(get_user_by_email_use_case_1.GetUserByEmail);
exports.container.bind(use_case_types_1.USER_USE_CASE.UpdatePassword).to(update_password_use_case_1.UpdatePassword);
exports.container.bind(use_case_types_1.USER_USE_CASE.CreateFakeUsers).to(create_fake_users_use_case_1.CreateFakeUsers);
// LIKE - USE - CASE
exports.container.bind(use_case_types_1.LIKE_USE_CASE.LikePost).to(like_use_case_1.Like);
exports.container.bind(use_case_types_1.LIKE_USE_CASE.UnlikePost).to(unlike_use_case_1.Unlike);
exports.container.bind(use_case_types_1.LIKE_USE_CASE.VerifyExistingLike).to(verify_existing_like_use_case_1.VerifyExistingLike);
exports.container.bind(use_case_types_1.LIKE_USE_CASE.CountPostLikes).to(count_post_likes_use_case_1.CountPostLikes);
