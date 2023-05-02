import { User } from "../../interfaces/user";
import { UserRepository } from "../../repositories/users.repository";

import { REPOSITORIES } from "../../types/repository.types";
import { inject, injectable } from "inversify"

@injectable()
export class GetUserByEmail {
    constructor (@inject(REPOSITORIES.User) private authRepo: UserRepository) {}

    async execute(email: string): Promise<User | null> {
        const user = await this.authRepo.getUserByEmail(email)
        return user;
    }
}