import { Post } from "../repositories/sequelize/post.model"
import { User } from "../repositories/sequelize/user.model"
import { PostUserLike as Like } from "../repositories/sequelize/post-user-like.model"

const sequelizeAssociations = () => {
    User.hasMany(Post/* , {
        onDelete: "CASCADE",
        foreignKey: {
            allowNull: false
        },
        sourceKey: "id"
    } */)
    Post.belongsTo(User)

    User.belongsToMany(Post, {
        through: Like
    })
    Post.belongsToMany(User, {
        through: Like
    })
}

export default sequelizeAssociations

