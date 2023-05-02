import { ID } from "../interfaces/id";

export interface LikeRepository {
    like(userId: ID, postId: ID): Promise<void>
    unlike(userId: ID, postId: ID): Promise<void>
    verifyExistingLike(userId: ID, postId: ID): Promise<boolean>
    countPostLike(postId: ID): Promise<number>
}