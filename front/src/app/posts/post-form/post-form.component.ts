import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { Subscription, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { PostCreationModel, PostModel, PostUpdateModel } from "../post.model";

@Component({
    selector: "app-post-form",
    templateUrl: "./post-form.component.html",
    styleUrls: [
        "./post-form.component.scss"
    ]
})
export class PostFormComponent implements OnInit, OnDestroy {
    constructor(private postsService: PostsService){}

    getPostToEdit$: Subscription

    postToEdit: PostModel

    postTitle: string = ''
    postContent: string = ''
    postImageUrl: string

    image: File

    onLeaveUpdate(){
        this.postToEdit = null
        this.postTitle = null
        this.postContent = null
        this.postImageUrl = null
        this.image = null
    }

    onFileSelected(event: Event){
        this.image = (event.target as HTMLInputElement).files[0]
    }

    onSubmitForm(f: NgForm){
        if(f.valid){
            if(this.postToEdit){
                const now = new Date()
                const timezoneOffset = 2
                const timezoneOffsetMs = timezoneOffset * 60 * 60 * 1000
                const frenchDate = new Date(now.getTime() + timezoneOffsetMs)
                const formattedFrenchDate = frenchDate.toISOString().slice(0, 19).replace('T', ' ')

                let postData: FormData | PostUpdateModel
                if(this.image){
                    const formData = new FormData()
                    formData.append('content', f.value.content)
                    formData.append('title', f.value.title)
                    formData.append('updateDate', formattedFrenchDate)
                    formData.append('image', this.image)
                    postData = formData
                }else{
                    postData = {
                        content: f.value.content,
                        title: f.value.title,
                        updateDate: formattedFrenchDate
                    }
                }

                this.postsService.updatePost(this.postToEdit.id, postData)
                    .pipe(
                        tap(message => {
                            this.postsService.postUpdateMessage$.next(message)
                            f.resetForm()
                            this.onLeaveUpdate()
                        })
                    )
                    .subscribe()
            }else{
                let postData: FormData | PostCreationModel
                if(this.image){
                    const formData = new FormData()
                    formData.append('content', f.value.content)
                    formData.append('title', f.value.title)
                    formData.append('image', this.image)
                    postData = formData
                }else{
                    postData = {
                        content: f.value.content,
                        title: f.value.title
                    }
                }
                this.postsService.createPost(postData)
                    .pipe(
                        tap(message => {
                            f.resetForm()
                        })
                    )
                    .subscribe()
            }
        }
    }

    ngOnInit(): void {
        this.getPostToEdit$ = this.postsService.getPostToEdit$.subscribe(post => {
            this.postToEdit = post
            this.postTitle = post.title
            this.postContent = post.content
            this.postImageUrl = post.imageUrl
        })
    }

    ngOnDestroy(): void {
        this.getPostToEdit$.unsubscribe()
    }
}