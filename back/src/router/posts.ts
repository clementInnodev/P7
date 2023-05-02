import { Router } from 'express'
import { body } from 'express-validator'

import { createPost, getPosts, getPost, updatePost, deletePost, getUserPosts, getPostsReverse, createFakePosts} from '../controller/posts'
import { alreadyLiked, like, numberOfLikes } from '../controller/likes'

import { isAuth } from '../middleware/isAuth'

export const router = Router()

router.get('/posts', isAuth, getPosts)

router.get('/posts-reverse', isAuth, getPostsReverse)

router.get('/post/:postId', isAuth, getPost)

router.get('/user-posts', isAuth, getUserPosts)

router.post('/post', isAuth,
    [
        body('title')
            .trim()
            .escape()
            .isLength({max: 50}).withMessage('Veuillez renseigner un titre valide (50 caractères maximum)'),
        body('content')
            .trim()
            .escape()
            .isLength({min: 2, max: 1000}).withMessage('Veuillez renseigner un contenu valide (entre 2 et 1000 caractères)')
    ],
    createPost
)

router.put('/post/:postId', isAuth,
    [
        body('title')
            .trim()
            .escape()
            .isLength({max: 50}).withMessage('Veuillez renseigner un titre valide (50 caractères maximum)'),
        body('content')
            .trim()
            .escape()
            .isLength({min: 2, max: 1000}).withMessage('Veuillez renseigner un contenu valide (entre 2 et 1000 caractères)'),
        body('imageUrl')
            .trim()
            .escape()
    ],
    updatePost
)

router.delete('/post/:postId', isAuth, deletePost)

router.post('/like', isAuth,
    [
        body('postId')
            .trim()
            .escape()
    ],
    like
)

router.get('/verify-like/:postId', isAuth, alreadyLiked)

router.get('/count-likes/:postId', isAuth, numberOfLikes)

router.get('/fake-posts', createFakePosts)
