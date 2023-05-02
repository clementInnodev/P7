"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("../infrastructure/repositories/sequelize/post"));
const message_1 = __importDefault(require("../models/sequelize/message"));
const user_1 = __importDefault(require("../models/sequelize/user"));
const sequelizeAssociations = () => {
    user_1.default.hasMany(post_1.default, {
        onDelete: "NO ACTION",
        foreignKey: {
            allowNull: false
        },
        sourceKey: "id"
    });
    post_1.default.hasOne(user_1.default);
    user_1.default.hasMany(message_1.default, {
        onDelete: "NO ACTION",
        foreignKey: {
            allowNull: false
        },
        sourceKey: "id"
    });
    message_1.default.hasOne(user_1.default);
};
exports.default = sequelizeAssociations;
