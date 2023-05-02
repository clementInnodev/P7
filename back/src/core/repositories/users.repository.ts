import { ID } from "../interfaces/id"
import {User, UserSignupBody, UserUpdateBody} from "../interfaces/user"

export interface UserRepository {
    createFakeUsers(): Promise<void>
    getUsers(limit: number, skip: number): Promise<User[]>
    getUserById(userId: ID): Promise<User | null>
    updateUser(userId: ID, userData: UserUpdateBody): Promise<User | null> 
    deleteUser(userId: ID): Promise<void>
    createUser(userData: UserSignupBody): Promise<User>
    confirmInscription(userId: ID): Promise<User | null>
    getUserByEmail(email: string): Promise<User | null>
    updatePassword(userId: ID, password: string): Promise<User | null>
}