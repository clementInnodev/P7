import { ID } from "../interfaces/id"
import { Post, PostToCreateData, postToUpdateData } from "../interfaces/post"

export interface PostRepository {
    getPosts(limit: number): Promise<Post[]>
    getPostsReverse(limit: number): Promise<Post[]>
    getPostById(postId: ID): Promise<Post | null>
    getUserPosts(userId: ID): Promise<Post[]>
    createPost(userId: ID, postData: PostToCreateData): Promise<Post> 
    updatePost(postId: ID, post: postToUpdateData): Promise<Post | null> 
    deletePost(postId: ID): Promise<void>
    createFakePosts(): Promise<void>
}