import { Mapper } from "../../../core/common/mapper";

import { PostUser, UserPost } from "../../../core/interfaces/post-user";

import { PostUser as SequelizePostUserModel, UserPost as SequelizeUserPost } from "./post-user.model";

export class SequelizePostUserMapper implements Mapper<PostUser, SequelizePostUserModel> {

    mapFrom(entity: PostUser ): SequelizePostUserModel {
        const { firstname, lastname, service } = entity.user
        const userImageUrl = entity.user.imageUrl
        const User = new SequelizeUserPost({
            firstname,
            lastname,
            imageUrl: userImageUrl,
            service
        })

        const { title, content, imageUrl, UserId, id, creationDate, updateDate } = entity
        const post = new SequelizePostUserModel({
            id,
            content,
            title,
            imageUrl,
            UserId,
            creationDate,
            updateDate,
            User
        })

        return post
    }

    mapTo(model: SequelizePostUserModel): PostUser {
        const { firstname, lastname, service } = model.User
        const userImageUrl = model.User.imageUrl
        const user: UserPost = {
            firstname,
            lastname,
            service,
            imageUrl: userImageUrl
        }

        const { id, title, content, imageUrl, UserId, creationDate, updateDate } = model
        const post = {
            id,
            title,
            content,
            imageUrl,
            UserId,
            creationDate,
            updateDate,
            user
        }
        return post
    }
}