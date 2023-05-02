import { inject, injectable } from "inversify"
import { ID } from "../../interfaces/id"
import { Post, postToUpdateData } from "../../interfaces/post"
import { PostRepository } from "../../repositories/posts.repository"
import { REPOSITORIES } from "../../types/repository.types"

@injectable()
export class UpdatePost {
    constructor (@inject(REPOSITORIES.Post) private postRepo: PostRepository) {}

    async execute(postId: ID, postData: postToUpdateData): Promise<Post | null> {
        const post = await this.postRepo.updatePost(postId, postData)
        console.log('Nouveau post : ', post)
        return post
    }
}