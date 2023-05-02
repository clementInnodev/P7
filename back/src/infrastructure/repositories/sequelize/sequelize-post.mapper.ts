import { Mapper } from "../../../core/common/mapper";
import { Post } from "../../../core/interfaces/post";
import { Post as SequelizePostModel } from './post.model'


export class SequelizePostMapper implements Mapper<Post, SequelizePostModel> {

    mapFrom(entity: Post): SequelizePostModel {
        const { title, content, imageUrl, UserId, id, creationDate, updateDate } = entity
        const post = new SequelizePostModel({
            id: id as number,
            title,
            content,
            imageUrl,
            creationDate,
            updateDate,
            UserId: UserId as number
        })
        return post
    }

    mapTo(model: SequelizePostModel): Post {
        const { id, title, content, imageUrl, UserId, creationDate, updateDate } = model
        const post = {
            id,
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