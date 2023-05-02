"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUserLike = void 0;
const sequelize_1 = require("sequelize");
const sql_db_1 = require("../../db/sql-db");
class PostUserLike extends sequelize_1.Model {
}
exports.PostUserLike = PostUserLike;
PostUserLike.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
}, {
    sequelize: sql_db_1.sequelize,
    tableName: 'PostUserLike',
    timestamps: false
});
