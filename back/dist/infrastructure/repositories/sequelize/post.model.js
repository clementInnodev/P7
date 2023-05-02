"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
const sql_db_1 = require("../../db/sql-db");
class Post extends sequelize_1.Model {
}
exports.Post = Post;
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
        allowNull: true
    },
    content: {
        type: sequelize_1.DataTypes.STRING(1500),
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    updateDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: sql_db_1.sequelize,
    tableName: 'Post',
    timestamps: false,
    hooks: {
        beforeCreate: (post, options) => {
            const now = new Date();
            const timezoneOffset = 2;
            const timezoneOffsetMs = timezoneOffset * 60 * 60 * 1000;
            const frenchDate = new Date(now.getTime() + timezoneOffsetMs);
            const formattedFrenchDate = frenchDate.toISOString().slice(0, 19).replace('T', ' ');
            post.creationDate = formattedFrenchDate;
        }
    }
});
