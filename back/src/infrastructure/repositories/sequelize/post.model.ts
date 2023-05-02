import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasOneGetAssociationMixin, ForeignKey } from "sequelize"
import { ID } from "../../../core/interfaces/id";

import { sequelize } from "../../db/sql-db";
import { User } from "./user.model";


export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{
    declare id: CreationOptional<number>
    declare title: CreationOptional<string>
    declare content: string
    declare imageUrl: CreationOptional<string | null> 
    declare UserId: ForeignKey<ID>
    declare creationDate: CreationOptional<string>
    declare updateDate: CreationOptional<string>
    declare getUser: HasOneGetAssociationMixin<User>
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    content: {
        type: DataTypes.STRING(1500),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updateDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{
    sequelize,
    tableName: 'Post',
    timestamps: false,
    hooks: {
      beforeCreate: (post: Post, options: any) => {
        const now = new Date()
        const timezoneOffset = 2
        const timezoneOffsetMs = timezoneOffset * 60 * 60 * 1000
        const frenchDate = new Date(now.getTime() + timezoneOffsetMs)
        const formattedFrenchDate = frenchDate.toISOString().slice(0, 19).replace('T', ' ') 
        post.creationDate = formattedFrenchDate
      }
    }
})