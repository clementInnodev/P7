import { User, UserSignupBody } from "../../interfaces/user";
import { UserRepository } from "../../repositories/users.repository";

import { REPOSITORIES } from "../../types/repository.types";
import { inject, injectable } from "inversify"

@injectable()
export class CreateUser {
    constructor (@inject(REPOSITORIES.User) private authRepo: UserRepository) {}

    async execute(userData: UserSignupBody): Promise<User> {
        const user = await this.authRepo.createUser(userData)
        return user;
    }
}