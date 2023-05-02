export interface PostModel {
    id: number
    title?: string
    content: string
    imageUrl?: string
    UserId: number
    creationDate: string
    updateDate?:string
}

export interface PostUserModel extends PostModel {
    user: {
        firstname: string
        lastname: string
        imageUrl: string
        service: string
    }
}

export interface PostCreationModel {
    title: string
    content: string
    image?: File
}

export interface PostUpdateModel {
    title: string
    content: string
    imageUrl?:string
    image?: File
    updateDate: string
}