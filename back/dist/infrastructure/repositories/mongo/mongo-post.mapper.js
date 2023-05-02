"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = require("./post.model");
class MongoPostMapper {
    mapFrom(entity) {
        const { title, content, imageUrl, UserId, id, creationDate, updateDate } = entity;
        const post = new post_model_1.PostModel({
            _id: id,
            title,
            content,
            imageUrl,
            creationDate,
            updateDate,
            userId: UserId
        });
        return post;
    }
    mapTo(model) {
        const { _id, title, content, imageUrl, creationDate, updateDate, UserId } = model;
        const post = {
            id: _id,
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
exports.default = MongoPostMapper;
