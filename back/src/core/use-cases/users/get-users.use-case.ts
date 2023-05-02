import { User } from "../../interfaces/user";
import { UserRepository } from "../../repositories/users.repository";

import { REPOSITORIES } from "../../types/repository.types";
import { inject, injectable } from "inversify"

@injectable()
export class GetUsers {
    constructor (@inject(REPOSITORIES.User) private postRepo: UserRepository) {}

    async execute(limit: number, skip: number): Promise<User[]> {
        const users = await this.postRepo.getUsers(limit, skip)
        return users;
    }
}