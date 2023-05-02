import { Post } from "./post";

export interface UserPost {
    firstname: string
    lastname: string
    imageUrl: string
    service: string
}

export interface PostUser extends Post {
    user: UserPost
}