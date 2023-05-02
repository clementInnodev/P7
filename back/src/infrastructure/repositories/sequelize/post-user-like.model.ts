import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, HasManyCountAssociationsMixin } from "sequelize"

import { ID } from "../../../core/interfaces/id"

import { sequelize } from "../../db/sql-db"

export class PostUserLike extends Model<InferAttributes<PostUserLike>, InferCreationAttributes<PostUserLike>>{
    declare id: CreationOptional<number>
    declare UserId: ForeignKey<ID>
    declare PostId: ForeignKey<ID>
}

PostUserLike.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
},
{
    sequelize,
    tableName: 'PostUserLike',
    timestamps: false
})