import { inject, injectable } from "inversify";
import { ID } from "../../interfaces/id";
import { Post } from "../../interfaces/post";
import { PostRepository } from "../../repositories/posts.repository";
import { REPOSITORIES } from "../../types/repository.types";

@injectable()
export class GetPostById {
    constructor (@inject(REPOSITORIES.Post) private postRepo: PostRepository) {}

    async execute(postId: ID): Promise<Post | null> {
        const post = await this.postRepo.getPostById(postId)
        return post;
    }
}