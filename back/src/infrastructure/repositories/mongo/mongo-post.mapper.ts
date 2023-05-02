import { ObjectId } from "mongoose";
import { Mapper } from "../../../core/common/mapper";
import { Post}  from "../../../core/interfaces/post";
import { IPostModel as MongoPostModel, PostModel } from './post.model'


class MongoPostMapper implements Mapper<Post, MongoPostModel> {

    mapFrom(entity: Post): MongoPostModel {
        const { title, content, imageUrl, UserId, id, creationDate, updateDate } = entity
        const post = new PostModel({
            _id: id as string,
            title,
            content,
            imageUrl,
            creationDate,
            updateDate,
            userId: UserId as string
        })
        return post
    }

    mapTo(model: MongoPostModel): Post {
        const { _id, title, content, imageUrl, creationDate, updateDate, UserId } = model
        const post = {
            id: _id,
            title,
            content,
            imageUrl,
            creationDate,
            updateDate,
            UserId
        }
        return post
    }
}

export default MongoPostMapper