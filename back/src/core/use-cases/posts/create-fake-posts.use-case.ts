import { inject, injectable } from "inversify";
import { REPOSITORIES } from "../../types/repository.types";
import { PostRepository } from "../../repositories/posts.repository";

@injectable()
export class CreateFakePosts {
    constructor(@inject(REPOSITORIES.Post) private postRepo: PostRepository){}

    async execute(){
        await this.postRepo.createFakePosts()
    }
}