import { ID } from "../../interfaces/id";
import { User } from "../../interfaces/user";
import { UserRepository } from "../../repositories/users.repository";

import { REPOSITORIES } from "../../types/repository.types";
import { inject, injectable } from "inversify"

@injectable()
export class UpdatePassword {
    constructor (@inject(REPOSITORIES.User) private authRepo: UserRepository) {}

    async execute(userId: ID, password: string): Promise<User | null> {
        const userUpdated = await this.authRepo.updatePassword(userId, password)
        return userUpdated;
    }
}