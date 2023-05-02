import { inject, injectable } from "inversify"
import { ID } from "../../interfaces/id"
import { Post, PostToCreateData } from "../../interfaces/post"
import { PostRepository } from "../../repositories/posts.repository"
import { REPOSITORIES } from "../../types/repository.types"

@injectable()
export class CreatePost {
    constructor (@inject(REPOSITORIES.Post) private postRepo: PostRepository) {}

    async execute(userId: ID, postData: PostToCreateData): Promise<Post> {
        const post = await this.postRepo.createPost(userId, postData)
        return post
    }
}