"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_model_1 = __importDefault(require("./message.model"));
class SequelizeMessageMapper {
    mapFrom(entity) {
        const { id, imageUrl, content, to, UserId } = entity;
        const message = new message_model_1.default({
            id: id,
            imageUrl,
            content,
            to: to,
            UserId: UserId
        });
        return message;
    }
    mapTo(model) {
        const { id, imageUrl, content, to, UserId } = model;
        const message = {
            id,
            imageUrl,
            content,
            to,
            UserId
        };
        return message;
    }
}
exports.default = SequelizeMessageMapper;
