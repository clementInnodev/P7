import { inject, injectable } from "inversify";
import { REPOSITORIES } from "../../types/repository.types";
import { LikeRepository } from "../../repositories/likes.repository";
import { ID } from "../../interfaces/id";

@injectable()
export class CountPostLikes {
    constructor(@inject(REPOSITORIES.Like) private postRepo: LikeRepository){}

    async execute(postId: ID): Promise<number>{
        const count = await this.postRepo.countPostLike(postId)
        return count
    }
}