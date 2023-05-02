"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizePostUserMapper = void 0;
const post_user_model_1 = require("./post-user.model");
class SequelizePostUserMapper {
    mapFrom(entity) {
        const { firstname, lastname, service } = entity.user;
        const userImageUrl = entity.user.imageUrl;
        const User = new post_user_model_1.UserPost({
            firstname,
            lastname,
            imageUrl: userImageUrl,
            service
        });
        const { title, content, imageUrl, UserId, id, creationDate, updateDate } = entity;
        const post = new post_user_model_1.PostUser({
            id,
            content,
            title,
            imageUrl,
            UserId,
            creationDate,
            updateDate,
            User
        });
        return post;
    }
    mapTo(model) {
        const { firstname, lastname, service } = model.User;
        const userImageUrl = model.User.imageUrl;
        const user = {
            firstname,
            lastname,
            service,
            imageUrl: userImageUrl
        };
        const { id, title, content, imageUrl, UserId, creationDate, updateDate } = model;
        const post = {
            id,
            title,
            content,
            imageUrl,
            UserId,
            creationDate,
            updateDate,
            user
        };
        return post;
    }
}
exports.SequelizePostUserMapper = SequelizePostUserMapper;
