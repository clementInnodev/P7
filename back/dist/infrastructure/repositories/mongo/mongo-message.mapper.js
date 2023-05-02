"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_model_1 = require("./message.model");
class MongoMessageMapper {
    mapFrom(entity) {
        const { content, imageUrl, UserId, id, to } = entity;
        const message = new message_model_1.MessageModel({
            _id: id,
            content,
            imageUrl,
            from: UserId,
            to: to
        });
        return message;
    }
    mapTo(model) {
        const { _id, content, imageUrl, from, to } = model;
        const message = {
            id: _id,
            imageUrl,
            content,
            to,
            UserId: from
        };
        return message;
    }
}
exports.default = MongoMessageMapper;
