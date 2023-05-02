import { Injectable } from "@angular/core";

import { PostCreationModel, PostModel, PostUpdateModel, PostUserModel } from "./post.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, EMPTY, Subject, catchError, map, tap } from "rxjs";

@Injectable({providedIn: "root"})
export class PostsService {

    page: number = 1

    //permet d'informer de l'ajout/la modification/la suppression d'un post pour les recharger
    newPost$ = new Subject<void>()

    //permet de faire passer les données d'un post depuis post.component au post-form.component pour l'update
    getPostToEdit$ = new Subject<PostUserModel | PostModel>()
    //transmet le message de confirmation de modification d'un post et permet également d'informer de la bonne modification d'un post
    postUpdateMessage$ = new Subject<string>()

    //Gère l'affichage du composant de confirmation de suppression et lui transmet l'id du post à supprimer
    hiddeDeletePostConfirmation$ = new BehaviorSubject<null | number>(null)
    //transmet le message de confirmation de suppresion d'un post et permet également d'informer de la bonne suppression d'un post
    postDeleteMessage$ = new Subject<string>()


    constructor(private http: HttpClient){}

    increasePage(){
        this.page++
    }

    createPost (post: FormData | PostCreationModel) {
        return this.http.post<{message: string, post: PostModel}>('http://localhost:3000/post', post)
            .pipe(
                map(res => res.message),
                tap(message => {
                    this.newPost$.next()
                }),
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    }

    getPosts () {
        console.log('refresh posts')
        return this.http.get<{message: string, posts: PostUserModel[]}>(`http://localhost:3000/posts?page=${this.page}`)
            .pipe(
                map(res => res.posts),
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    }

    getPostsReverse () {
        console.log('refresh posts reverse')
        return this.http.get<{message: string, posts: PostUserModel[]}>(`http://localhost:3000/posts-reverse?page=${this.page}`)
            .pipe(
                map(res => res.posts),
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    }

    getUserPosts () {
        return this.http.get<{message: string, posts: PostModel[]}>(`http://localhost:3000/user-posts`)
            .pipe(
                map(res => res.posts),
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    }

    /* getPost (postId: number){
        return this.http.get<{message: string, post: PostModel}>(`http://localhost:3000/post/${postId}`)
            .pipe(
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    } */

    updatePost (postId: number, post: PostUpdateModel | FormData) {
        return this.http.put<{message: string, post: PostModel}>(`http://localhost:3000/post/${postId}`, post)
            .pipe(
                map(res => res.message),
                tap(message => {
                    this.newPost$.next()
                }),
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    }

    deletePost (postId: number) {
        return this.http.delete<{message: string}>(`http://localhost:3000/post/${postId}`)
            .pipe(
                map(res => res.message),
                tap(message => {
                    this.newPost$.next()
                    this.hiddeDeletePostConfirmation$.next(null)
                    this.postDeleteMessage$.next(message)
                }),
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    }

    likePost (postId: number) {
        return this.http.post<{message: string}>(`http://localhost:3000/like`, {postId})
            .pipe(
                map(res => res.message),
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    }

    verifyPostAlreadyLiked (postId: number) {
        return this.http.get<{alreadyLiked: boolean}>(`http://localhost:3000/verify-like/${postId}`)
            .pipe(
                map(res => res.alreadyLiked),
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    }

    countPostLike (postId: number) {
        return this.http.get<{numberOfLikes: number}>(`http://localhost:3000/count-likes/${postId}`)
            .pipe(
                map(res => {
                    return res.numberOfLikes
                }),
                catchError(res => {
                    console.log(res.error)
                    return EMPTY
                })
            )
    }
}