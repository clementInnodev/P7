"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizePostMapper = void 0;
const post_model_1 = require("./post.model");
class SequelizePostMapper {
    mapFrom(entity) {
        const { title, content, imageUrl, UserId, id, creationDate, updateDate } = entity;
        const post = new post_model_1.Post({
            id: id,
            title,
            content,
            imageUrl,
            creationDate,
            updateDate,
            UserId: UserId
        });
        return post;
    }
    mapTo(model) {
        const { id, title, content, imageUrl, UserId, creationDate, updateDate } = model;
        const post = {
            id,
            title,
            content,
            imageUrl,
            creationDate,
            updateDate,
            UserId
        };
        return post;
    }
}
exports.SequelizePostMapper = SequelizePostMapper;
