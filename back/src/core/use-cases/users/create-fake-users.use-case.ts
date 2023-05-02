import { UserRepository } from "../../repositories/users.repository";

import { REPOSITORIES } from "../../types/repository.types";
import { inject, injectable } from "inversify"

@injectable()
export class CreateFakeUsers {
    constructor (@inject(REPOSITORIES.User) private authRepo: UserRepository) {}

    async execute(): Promise<void> {
        await this.authRepo.createFakeUsers()
    }
}