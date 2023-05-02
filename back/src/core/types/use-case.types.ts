export const POST_USE_CASE = {
    CreatePost: Symbol.for("CreatePost"),
    UpdatePost: Symbol.for("UpdatePost"),
    GetPosts: Symbol.for("GetPosts"),
    GetPostsReverse: Symbol.for("GetPostsReverse"),
    GetPostById: Symbol.for("GetPostById"),
    GetUserPosts: Symbol.for("GetUserPosts"),
    DeletePost: Symbol.for("DeletePost"),
    CreateFakePosts: Symbol.for("CreateFakePosts")
}

export const USER_USE_CASE = {
    CreateUser: Symbol.for("CreateUser"),
    UpdateUser: Symbol.for("UpdateUser"),
    GetUsers: Symbol.for("GetUsers"),
    GetUserById: Symbol.for("GetUserById"),
    DeleteUser: Symbol.for("DeleteUser"),
    ConfirmationInscription: Symbol.for("ConfirmationInscription"),
    GetUserByEmail: Symbol.for("GetUserByEmail"),
    UpdatePassword: Symbol.for("UpdatePassword"),
    CreateFakeUsers: Symbol.for("CreateFakeUsers")
}

export const LIKE_USE_CASE = {
    LikePost: Symbol.for("LikePost"),
    UnlikePost: Symbol.for("UnlikePost"),
    CountPostLikes: Symbol.for("CountPostLikes"),
    VerifyExistingLike: Symbol.for("VerifyExistingLike")
}
