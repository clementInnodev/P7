import { ID } from "./id";

export interface Post {
    id: ID;
    title: string;
    content: string;
    imageUrl: string | null;
    UserId: ID
    creationDate: string
    updateDate?: string
}

export interface postToUpdateData{
    title?: string
    content: string
    updateDate: string
    imageUrl?: string |null
}

export interface PostToCreateData{
    title?: string
    content: string
    imageUrl?: string
}

export interface CreatePostBody {
    title?: string;
    content: string;
}

export interface UpdatePostBody {
    title?: string;
    content: string;
    updateDate: string
    imageUrl?: string
}