import { ID } from "../../interfaces/id";
import { User } from "../../interfaces/user";
import { UserRepository } from "../../repositories/users.repository";

import { REPOSITORIES } from "../../types/repository.types";
import { inject, injectable } from "inversify"

@injectable()
export class GetUserById {
    constructor (@inject(REPOSITORIES.User) private postRepo: UserRepository) {}

    async execute(userId: ID): Promise<User | null> {
        const user = await this.postRepo.getUserById(userId)
        return user;
    }
}