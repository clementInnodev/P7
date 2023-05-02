"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = require("../repositories/sequelize/post.model");
const user_model_1 = require("../repositories/sequelize/user.model");
const post_user_like_model_1 = require("../repositories/sequelize/post-user-like.model");
const sequelizeAssociations = () => {
    user_model_1.User.hasMany(post_model_1.Post /* , {
        onDelete: "CASCADE",
        foreignKey: {
            allowNull: false
        },
        sourceKey: "id"
    } */);
    post_model_1.Post.belongsTo(user_model_1.User);
    user_model_1.User.belongsToMany(post_model_1.Post, {
        through: post_user_like_model_1.PostUserLike
    });
    post_model_1.Post.belongsToMany(user_model_1.User, {
        through: post_user_like_model_1.PostUserLike
    });
};
exports.default = sequelizeAssociations;
