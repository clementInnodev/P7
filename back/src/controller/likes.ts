import { NextFunction, Request, Response } from "express"
import { ID } from "../core/interfaces/id"
import { container } from "../utils/inversify.config"
import { GetPostById } from "../core/use-cases/posts/get-post-by-id.use-case"
import { LIKE_USE_CASE, POST_USE_CASE } from "../core/types/use-case.types"
import { CustomError } from "../utils/errors"
import { VerifyExistingLike } from "../core/use-cases/likes/verify-existing-like.use.case"
import { Like } from "../core/use-cases/likes/like.use-case"
import { Unlike } from "../core/use-cases/likes/unlike.use-case"
import { CountPostLikes } from "../core/use-cases/likes/count-post-likes.use-case"

export const like = async (req: Request<{}, {}, {postId: ID}>, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId!
        const postId = req.body.postId

        const post = await container.get<GetPostById>(POST_USE_CASE.GetPostById).execute(postId)
        if(!post){
            const error =  new CustomError("Not Found Error", `Le post avec l'id ${postId} n'existe pas.`, 404)
            throw error
        }

        let message: string

        const alreadyLiked = await container.get<VerifyExistingLike>(LIKE_USE_CASE.VerifyExistingLike).execute(userId, postId)
        if(alreadyLiked){
            await container.get<Unlike>(LIKE_USE_CASE.UnlikePost).execute(userId, postId)
            message = 'Votre like a été retiré.'
        }else{
            await container.get<Like>(LIKE_USE_CASE.LikePost).execute(userId, postId)
            message = 'Votre like a été ajouté'
        }

        res.status(200).json({message})
    } catch (error) {
        next(error)
    }
}

export const alreadyLiked = async (req: Request<{postId: string}, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId!
        const postId = req.params.postId
        const alreadyLiked = await container.get<VerifyExistingLike>(LIKE_USE_CASE.VerifyExistingLike).execute(userId, postId)
        res.status(200).json({alreadyLiked})
    } catch (error) {
        next(error)
    }
}

export const numberOfLikes = async (req: Request<{postId: string}, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.postId
        const numberOfLikes = await container.get<CountPostLikes>(LIKE_USE_CASE.CountPostLikes).execute(postId)
        res.status(200).json({numberOfLikes})
    } catch (error) {
        next(error)
    }
}