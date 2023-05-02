import { inject, injectable } from "inversify";
import { Post } from "../../interfaces/post";
import { PostRepository } from "../../repositories/posts.repository";
import { REPOSITORIES } from "../../types/repository.types";

@injectable()
export class GetPostsReverse {
    constructor (@inject(REPOSITORIES.Post) private postRepo: PostRepository) {}

    async execute(limit: number): Promise<Post[]> {
        const posts = await this.postRepo.getPostsReverse(limit)
        return posts;
    }
}