import { ID } from "../../interfaces/id";
import {User} from "../../interfaces/user";
import { UserRepository } from "../../repositories/users.repository";

import { REPOSITORIES } from "../../types/repository.types";
import { inject, injectable } from "inversify"

@injectable()
export class ConfirmInscription {
    constructor (@inject(REPOSITORIES.User) private authRepo: UserRepository) {}

    async execute(userId: ID): Promise<User | null> {
        const userUpdated = await this.authRepo.confirmInscription(userId)
        return userUpdated;
    }
}