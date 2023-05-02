"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sql_db_1 = require("../../db/sql-db");
class Like extends sequelize_1.Model {
}
Like.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
}, {
    sequelize: sql_db_1.sequelize,
    tableName: 'Like',
    timestamps: true
});
exports.default = Like;
