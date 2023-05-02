"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sql_db_1 = __importDefault(require("../../../db/sql-db"));
const user_1 = __importDefault(require("../../../models/sequelize/user"));
class Post extends sequelize_1.Model {
}
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.STRING(1500),
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: sql_db_1.default,
    tableName: 'Post',
    timestamps: true
});
exports.default = Post;
