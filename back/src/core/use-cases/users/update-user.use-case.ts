import { ID } from "../../interfaces/id";
import { User, UserUpdateBody } from "../../interfaces/user";
import { UserRepository } from "../../repositories/users.repository";

import { REPOSITORIES } from "../../types/repository.types";
import { inject, injectable } from "inversify"

@injectable()
export class UpdateUser {
    constructor (@inject(REPOSITORIES.User) private postRepo: UserRepository) {}

    async execute(userId: ID, userData: UserUpdateBody): Promise<User | null> {
        const userUpdated = await this.postRepo.updateUser(userId, userData)
        return userUpdated;
    }
}