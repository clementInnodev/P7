import { inject, injectable } from "inversify";
import { ID } from "../../interfaces/id";
import { Post } from "../../interfaces/post";
import { PostRepository } from "../../repositories/posts.repository";
import { REPOSITORIES } from "../../types/repository.types";

@injectable()
export class GetUserPosts {
    constructor (@inject(REPOSITORIES.Post) private postRepo: PostRepository) {}

    async execute(userId: ID): Promise<Post[]> {
        const post = await this.postRepo.getUserPosts(userId)
        return post;
    }
}