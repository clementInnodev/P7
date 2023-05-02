import { inject, injectable } from "inversify"
import { ID } from "../../interfaces/id"
import { PostRepository } from "../../repositories/posts.repository"
import { REPOSITORIES } from "../../types/repository.types"

@injectable()
export class DeletePost {
    constructor (@inject(REPOSITORIES.Post) private postRepo: PostRepository) {}

    async execute(postId: ID): Promise<void> {
        const post = await this.postRepo.deletePost(postId)
        return post
    }
}