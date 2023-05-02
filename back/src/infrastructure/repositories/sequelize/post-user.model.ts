import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize"
import { ID } from "../../../core/interfaces/id"

export class UserPost extends Model<InferAttributes<UserPost>, InferCreationAttributes<UserPost>>{
    declare firstname: string
    declare lastname: string
    declare imageUrl: string
    declare service: string
}

export class PostUser extends Model<InferAttributes<PostUser>, InferCreationAttributes<PostUser>>{
    declare id: ID
    declare title: string
    declare content: string
    declare imageUrl: string | null
    declare UserId: ID
    declare creationDate: string
    declare updateDate: CreationOptional<string>
    declare User: UserPost
}