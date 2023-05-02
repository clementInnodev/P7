import { Container } from "inversify";
import { REPOSITORIES } from "../core/types/repository.types";
import { LIKE_USE_CASE, POST_USE_CASE, USER_USE_CASE } from "../core/types/use-case.types";
import { DATABASE, DATABASE_CONFIG } from "../core/types/db.types";

import { PostRepository } from "../core/repositories/posts.repository";
import { UserRepository } from "../core/repositories/users.repository";
import { LikeRepository } from "../core/repositories/likes.repository";

import { SequelizeLike, SequelizePost, SequelizeUser } from "../infrastructure/repositories/sequelize/sequelize";
import { MongoPost, MongoUser } from "../infrastructure/repositories/mongo/mongoose";

import { Database, DatabaseConfig } from "../infrastructure/db/database";

import { CreatePost } from "../core/use-cases/posts/create-post.use-case";
import { UpdatePost } from "../core/use-cases/posts/update-post.use-case";
import { DeletePost } from "../core/use-cases/posts/delete-post.use-case";
import { GetPosts } from "../core/use-cases/posts/get-posts.use-case";
import { GetUserPosts } from "../core/use-cases/posts/get-user-posts.use-case";
import { GetPostById } from "../core/use-cases/posts/get-post-by-id.use-case";
import { GetPostsReverse } from "../core/use-cases/posts/get-posts-reverse.use-case";
import { CreateFakePosts } from "../core/use-cases/posts/create-fake-posts.use-case";

import { CreateUser } from "../core/use-cases/users/create-user.use-case";
import { UpdateUser } from "../core/use-cases/users/update-user.use-case";
import { GetUsers } from "../core/use-cases/users/get-users.use-case";
import { GetUserById } from "../core/use-cases/users/get-user-by-id.use-case";
import { DeleteUser } from "../core/use-cases/users/delete-user.use-case";
import { ConfirmInscription } from "../core/use-cases/users/confirm-inscription.use-case";
import { GetUserByEmail } from "../core/use-cases/users/get-user-by-email.use-case";
import { UpdatePassword } from "../core/use-cases/users/update-password.use-case";
import { CreateFakeUsers } from "../core/use-cases/users/create-fake-users.use-case";

import { Like } from "../core/use-cases/likes/like.use-case";
import { Unlike } from "../core/use-cases/likes/unlike.use-case";
import { VerifyExistingLike } from "../core/use-cases/likes/verify-existing-like.use.case";
import { CountPostLikes } from "../core/use-cases/likes/count-post-likes.use-case";


export const container = new Container({
    defaultScope: "Transient" // à vérifier
})

// DATABASE
container.bind<DatabaseConfig>(DATABASE_CONFIG).toConstantValue({ type: 'mysql' })
container.bind<Database>(DATABASE).to(Database)//.inSingletonScope()

// REPOSITORIES
container.bind<PostRepository>(REPOSITORIES.Post).to(SequelizePost)
container.bind<UserRepository>(REPOSITORIES.User).to(SequelizeUser)
container.bind<LikeRepository>(REPOSITORIES.Like).to(SequelizeLike)

// POST - USE - CASE
container.bind<CreatePost>(POST_USE_CASE.CreatePost).to(CreatePost)
container.bind<UpdatePost>(POST_USE_CASE.UpdatePost).to(UpdatePost)
container.bind<DeletePost>(POST_USE_CASE.DeletePost).to(DeletePost)
container.bind<GetPosts>(POST_USE_CASE.GetPosts).to(GetPosts)
container.bind<GetPostsReverse>(POST_USE_CASE.GetPostsReverse).to(GetPostsReverse)
container.bind<GetUserPosts>(POST_USE_CASE.GetUserPosts).to(GetUserPosts)
container.bind<GetPostById>(POST_USE_CASE.GetPostById).to(GetPostById)
container.bind<CreateFakePosts>(POST_USE_CASE.CreateFakePosts).to(CreateFakePosts)

// USER - USE - CASE
container.bind<CreateUser>(USER_USE_CASE.CreateUser).to(CreateUser)
container.bind<UpdateUser>(USER_USE_CASE.UpdateUser).to(UpdateUser)
container.bind<GetUsers>(USER_USE_CASE.GetUsers).to(GetUsers)
container.bind<GetUserById>(USER_USE_CASE.GetUserById).to(GetUserById)
container.bind<DeleteUser>(USER_USE_CASE.DeleteUser).to(DeleteUser)
container.bind<ConfirmInscription>(USER_USE_CASE.ConfirmationInscription).to(ConfirmInscription)
container.bind<GetUserByEmail>(USER_USE_CASE.GetUserByEmail).to(GetUserByEmail)
container.bind<UpdatePassword>(USER_USE_CASE.UpdatePassword).to(UpdatePassword)
container.bind<CreateFakeUsers>(USER_USE_CASE.CreateFakeUsers).to(CreateFakeUsers)

// LIKE - USE - CASE
container.bind<Like>(LIKE_USE_CASE.LikePost).to(Like)
container.bind<Unlike>(LIKE_USE_CASE.UnlikePost).to(Unlike)
container.bind<VerifyExistingLike>(LIKE_USE_CASE.VerifyExistingLike).to(VerifyExistingLike)
container.bind<CountPostLikes>(LIKE_USE_CASE.CountPostLikes).to(CountPostLikes)