import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"

import { getIO } from "../utils/socket"

import { CustomError } from "../utils/errors"

import { GetPosts } from "../core/use-cases/posts/get-posts.use-case"
import { GetPostById } from "../core/use-cases/posts/get-post-by-id.use-case"
import { GetUserPosts } from "../core/use-cases/posts/get-user-posts.use-case";
import { CreatePost } from "../core/use-cases/posts/create-post.use-case"
import { UpdatePost } from "../core/use-cases/posts/update-post.use-case"
import { DeletePost } from "../core/use-cases/posts/delete-post.use-case"
import { GetUserById } from "../core/use-cases/users/get-user-by-id.use-case"
import { GetPostsReverse } from "../core/use-cases/posts/get-posts-reverse.use-case";
import { CreateFakePosts } from "../core/use-cases/posts/create-fake-posts.use-case";

import { container } from "../utils/inversify.config";
import { POST_USE_CASE, USER_USE_CASE } from "../core/types/use-case.types";
import { Pagination } from "../core/interfaces/pagination";
import { ID } from "../core/interfaces/id";
import { CreatePostBody, PostToCreateData, UpdatePostBody, postToUpdateData } from "../core/interfaces/post";
import { deleteFile } from "../utils/file-helper";

export const getPosts = async (req: Request<{}, {}, {}, Pagination>, res: Response, next: NextFunction) => {
    try {
        const POSTS_PER_PAGE: number = req.query.limit_per_page ? +req.query.limit_per_page : 20
        const page: number = req.query.page ? +req.query.page : 1

        const posts = await container.get<GetPosts>(POST_USE_CASE.GetPosts).execute(POSTS_PER_PAGE)
        res.status(200).json({
            message: 'Posts récupérés avec succès',
            posts
        })
    } catch (error: any) {
        next(error)
    }
}


export const getPostsReverse = async (req: Request<{}, {}, {}, Pagination>, res: Response, next: NextFunction) => {
    try {
        const POSTS_PER_PAGE: number = req.query.limit_per_page ? +req.query.limit_per_page : 20
        const page: number = req.query.page ? +req.query.page : 1

        const posts = await container.get<GetPostsReverse>(POST_USE_CASE.GetPostsReverse).execute(POSTS_PER_PAGE)
        res.status(200).json({
            message: 'Posts récupérés avec succès',
            posts
        })
    } catch (error: any) {
        next(error)
    }
}


export const getPost = async (req: Request<{postId: string}>, res: Response, next: NextFunction) => {
    const postId: ID = req.params.postId
    try {
        const post = await container.get<GetPostById>(POST_USE_CASE.GetPostById).execute(postId)
        if(!post){
            const error: CustomError = new CustomError('Not Found Error', `Aucun post trouvé avec l'id ${postId}`, 404)
            throw error
        }
        res.status(200).json({
            message: `Post ${postId} trouvé avec succès`,
            post
        })
    } catch (error: any) {
        next(error)
    }
}

export const getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    const userId: ID = req.userId!
    try {
        const posts = await container.get<GetUserPosts>(POST_USE_CASE.GetUserPosts).execute(userId)
        res.status(200).json({
            message: 'Posts récupérés avec succès',
            posts
        })
    } catch (error: any) {
        next(error)
    }
}


export const createPost = async (req: Request<{}, {}, CreatePostBody>, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors.array())
            const error: CustomError = new CustomError(
                'Validation Error',
                'Erreur de validation, les données renseignées ne sont pas correctes!',
                400,
                errors.array()
            )
            throw error
        }

        const userId: ID = req.userId!
        const user = await container.get<GetUserById>(USER_USE_CASE.GetUserById).execute(userId)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404)
            throw error
        }

        let postData: PostToCreateData = {
            content: req.body.content
        }
        if(req.body.title && req.body.title !== 'undefined'){
            postData = {
                ...postData,
                title: req.body.title
            }
        }
        if(req.file){
            postData = {
                ...postData,
                imageUrl: req.file.path
            }
        }

        const post = await container.get<CreatePost>(POST_USE_CASE.CreatePost).execute(userId, postData)

        const io = getIO()
        io.emit('posts',{
            action: 'create',
            post
        })

        res.status(201).json({
            message: 'Post ajouté avec succès',
            post
        })
    } catch (error: any) {
        next(error)
    }    
}


export const updatePost = async (req: Request<{postId: string}, {}, UpdatePostBody>, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors.array())
            const error: CustomError = new CustomError(
                'Validation Error',
                'Erreur de validation, les données renseignées ne sont pas correctes!',
                400,
                errors.array()
            )
            throw error
        }

        const userId: ID = req.userId!
        const postId: ID = req.params.postId
        
        const user = await container.get<GetUserById>(USER_USE_CASE.GetUserById).execute(userId)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404)
            throw error
        }

        const post = await container.get<GetPostById>(POST_USE_CASE.GetPostById).execute(postId)
        if(!post){
            const error: CustomError = new CustomError('Not Found Error', `Le post avec l'id ${postId} n'existe pas`, 404)
            throw error
        }

        if(post.UserId.toString() !== user.id.toString() && !user.admin){
            const error: CustomError = new CustomError('Authorization Error', 'Vous n\'êtes pas autorisé à modifier ce post', 401)
            throw error
        }        

        let postData: postToUpdateData = {
            content: req.body.content,
            updateDate: req.body.updateDate
        }
        if(req.body.title && req.body.title !== 'undefined'){
            postData = {
                ...postData,
                title: req.body.title
            }
        }
        if(req.body.imageUrl && req.body.imageUrl === 'delete'){
            postData = {
                ...postData,
                imageUrl: null
            }
        }
        if(req.file){
            postData = {
                ...postData,
                imageUrl: req.file.path
            }
        }

        if(post.imageUrl && (req.file || req.body.imageUrl === 'delete')){
            deleteFile(post.imageUrl)
        }

        const postUpdated = await container.get<UpdatePost>(POST_USE_CASE.UpdatePost).execute(post.id, postData)

        const io = getIO()
        io.emit('posts',{
            action: 'update',
            postUpdated
        })

        res.status(200).json({
            message: 'Post mis à jour avec succès',
            postUpdated
        })
    } catch (error: any) {
        next(error)
    }
}


export const deletePost = async (req: Request<{postId: string}>, res: Response, next: NextFunction) => {
    const userId = req.userId!
    const postId: ID = req.params.postId

    try {
        const user = await container.get<GetUserById>(USER_USE_CASE.GetUserById).execute(userId)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404)
            throw error
        }

        const post = await container.get<GetPostById>(POST_USE_CASE.GetPostById).execute(postId)
        if(!post){
            const error: CustomError = new CustomError('Not Found Error', `Le post avec l'id ${postId} n'existe pas`, 404)
            throw error
        }

        if(post.UserId.toString() !== user.id.toString() && !user.admin){
            const error: CustomError = new CustomError('Authorization Error', 'Vous n\'êtes pas autorisé à supprimer ce post', 401)
            throw error
        }

        if(post.imageUrl){
            deleteFile(post.imageUrl)
        }

        container.get<DeletePost>(POST_USE_CASE.DeletePost).execute(postId)

        const io = getIO()
        io.emit('posts',{
            action: 'delete'
        })

        res.status(200).json({
            message: 'Post supprimé avec succès'
        })
    } catch (error: any) {
        next(error)
    }
}

export const createFakePosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await container.get<CreateFakePosts>(POST_USE_CASE.CreateFakePosts).execute()
        res.status(200).json({
            message: "Les posts de test ont été créés avec succès !"
        })
    } catch (error: any) {
        next(error)
    }
}