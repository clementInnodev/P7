import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyCreateAssociationMixin, HasManyCountAssociationsMixin, HasManyRemoveAssociationMixin, HasManyGetAssociationsMixin } from "sequelize"

import { sequelize } from "../../db/sql-db"
import { Post } from "./post.model"


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<number>
    declare email: string
    declare password: string
    declare firstname: string
    declare lastname: string
    declare gender: string
    declare phoneNumber: string
    declare birthday: string
    declare address: string
    declare additionalAddress: CreationOptional<string>
    declare postcode: string
    declare town: string
    declare confirmed: CreationOptional<boolean>
    declare admin: CreationOptional<boolean>
    declare service: string
    declare creationDate: CreationOptional<string>
    declare updateDate: CreationOptional<string>
    declare createPost: HasManyCreateAssociationMixin<Post>
    declare countPosts: HasManyCountAssociationsMixin
    declare getPosts: HasManyGetAssociationsMixin<Post>
    declare removePost: HasManyRemoveAssociationMixin<Post, number>
    declare removePosts: HasManyRemoveAssociationMixin<Post, number>
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    additionalAddress: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    postcode: {
        type: DataTypes.CHAR(15),
        allowNull: false
    },
    town: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updateDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    sequelize,
    tableName: 'User',
    timestamps: false,
    hooks: {
      beforeCreate: (user: User, options: any) => {
        const now = new Date()
        const timezoneOffset = 2
        const timezoneOffsetMs = timezoneOffset * 60 * 60 * 1000
        const frenchDate = new Date(now.getTime() + timezoneOffsetMs)
        const formattedFrenchDate = frenchDate.toISOString().slice(0, 19).replace('T', ' ') 
        user.creationDate = formattedFrenchDate
      }
    }
}
)