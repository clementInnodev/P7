import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { NgForm } from "@angular/forms";
import { EMPTY, Subscription, catchError, tap } from "rxjs";
import { PostCreationModel, PostModel, PostUpdateModel } from "src/app/posts/post.model";
import { PostsService } from "src/app/posts/posts.service";

@Component({
    selector: "app-home-article-form",
    templateUrl: "./home-article-form.component.html",
    styleUrls: [
        "./home-article-form.component.scss"
    ]
})
export class HomeArticleFormComponent implements OnInit, OnChanges {
    @Output() closeFormEvent = new EventEmitter<false>()

    @ViewChild('contentMissing', {static: true}) contentMissing: ElementRef<HTMLDivElement>

    @Input('post') postToEdit: PostModel | null

    postContent: string
    postTitle: string

    postImageUrl: string
    image: File

    updateMessage: string
    deleteMessage: string

    constructor(private postsService: PostsService){}

    onCloseForm(){
        this.closeFormEvent.emit(false)
        this.image = null
    }

    onFileSelected(event: Event){
        this.image = (event.target as HTMLInputElement).files[0]
        console.log(this.image)
    }

    onClearFile(){
        this.image = null
    }

    onSubmitForm(f: NgForm){
        if(f.valid){
            if(this.postToEdit){
                const now = new Date()
                const timezoneOffset = 2
                const timezoneOffsetMs = timezoneOffset * 60 * 60 * 1000
                const frenchDate = new Date(now.getTime() + timezoneOffsetMs)
                const formattedFrenchDate = frenchDate.toISOString().slice(0, 19).replace('T', ' ')

                let postData : PostUpdateModel | FormData
                if(this.image){
                    const formData: FormData = new FormData()
                    formData.append('image', this.image)
                    formData.append('content', f.value.content)
                    formData.append('title', f.value.title)
                    formData.append('updateDate', formattedFrenchDate)
                    postData = formData
                }else{
                    postData = {
                        content: f.value.content,
                        title: f.value.title,
                        imageUrl: this.postImageUrl,
                        updateDate: formattedFrenchDate
                    }
                }

                this.postsService.updatePost(this.postToEdit.id, postData)
                    .subscribe(message => {
                        this.postsService.postUpdateMessage$.next(message)
                    })
            }else{
                let postData: PostCreationModel | FormData
                if(this.image){
                    const formData: FormData = new FormData()
                    formData.append('image', this.image)
                    formData.append('content', f.value.content)
                    formData.append('title', f.value.title)
                    postData = formData
                }else{
                    postData = {
                        content: f.value.content,
                        title: f.value.title
                    }
                }
                this.postsService.createPost(postData)
                    .subscribe()
            }
            f.resetForm()
            this.onCloseForm()
        }
    }

    ngOnInit(): void {
        if(this.postToEdit){
            this.postContent = this.postToEdit.content
            this.postTitle = this.postToEdit.title
            this.postImageUrl = this.postToEdit.imageUrl
        }
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if(this.postToEdit){
            this.postContent = this.postToEdit.content
            this.postTitle = this.postToEdit.title
            this.postImageUrl = this.postToEdit.imageUrl
        }
    }
}