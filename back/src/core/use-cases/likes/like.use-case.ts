import { inject, injectable } from "inversify";
import { REPOSITORIES } from "../../types/repository.types";
import { LikeRepository } from "../../repositories/likes.repository";
import { ID } from "../../interfaces/id";

@injectable()
export class Like {
    constructor(@inject(REPOSITORIES.Like) private postRepo: LikeRepository){}

    async execute(userId: ID, postId: ID){
        await this.postRepo.like(userId, postId)
    }
}