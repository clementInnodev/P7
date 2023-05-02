import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { PostModel, PostUserModel } from "../../post.model";
import { UserModel } from "src/app/users/user.model";
import { PostsService } from "../../posts.service";
import { EMPTY, Subscription, catchError } from "rxjs";

@Component({
    selector: "app-post",
    templateUrl: "./post.component.html",
    styleUrls: [
        "./post.component.scss"
    ]
})
export class PostComponent implements OnInit, OnDestroy {
    @Input() postItem: PostUserModel

    hiddeDeletePostConfirmation$: Subscription

    ownPost: boolean

    creationDateTxt: string
    updateDateTxt: string

    showDeleteConfirmation: boolean = false

    constructor(private postsService: PostsService){}

    onUpdatePost(){
        this.postsService.getPostToEdit$.next(this.postItem)
    }

    onDeletePost(){
        this.postsService.hiddeDeletePostConfirmation$.next(this.postItem.id)
    }

    ngOnInit(): void {
        const user: UserModel = JSON.parse(localStorage.getItem('user'))
        const userId = user.id
        const isAdmin = user.admin
        if(+userId === +this.postItem.UserId || isAdmin){
            this.ownPost = true
        }else{
            this.ownPost = false
        }

        const nowDate = new Date(Date.now())
        const nowDay = nowDate.getDate()

        const postCreationDateTime = this.postItem.creationDate
        const postCreationDate = new Date(postCreationDateTime);
        const postCreationDay = postCreationDate.getDate();

        if(postCreationDay === nowDay){
            this.creationDateTxt = "aujourd'hui"
        }else if(postCreationDay === (nowDay - 1)){
            this.creationDateTxt = "hier"
        }else if(postCreationDay === (nowDay - 2)){
            this.creationDateTxt = "avant-hier"
        }

        const postUpdateDateTime = this.postItem.updateDate
        if(postUpdateDateTime && postUpdateDateTime !== undefined && postUpdateDateTime !== ''){
            const postUpdateDate = new Date(postUpdateDateTime);
            const postUpdateDay = postUpdateDate.getDate();
            if(postUpdateDay === nowDay){
                this.updateDateTxt = "aujourd'hui"
            }else if(postUpdateDay === (nowDay - 1)){
                this.updateDateTxt = "hier"
            }else if(postUpdateDay === (nowDay - 2)){
                this.updateDateTxt = "avant-hier"
            }
        }

        this.hiddeDeletePostConfirmation$ = this.postsService.hiddeDeletePostConfirmation$.subscribe(res => {
            this.showDeleteConfirmation = false
        })
    }

    ngOnDestroy(): void {
        this.hiddeDeletePostConfirmation$.unsubscribe()
    }
}