import { ID } from "../../interfaces/id"
import { UserRepository } from "../../repositories/users.repository"

import { REPOSITORIES } from "../../types/repository.types";
import { inject, injectable } from "inversify"

@injectable()
export class DeleteUser {
    constructor (@inject(REPOSITORIES.User) private postRepo: UserRepository) {}

    async execute(userId: ID): Promise<void> {
        await this.postRepo.deleteUser(userId)
    }
}