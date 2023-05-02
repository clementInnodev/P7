import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { Observable, tap } from "rxjs";
import { PostUserModel } from "src/app/posts/post.model";
import { PostsService } from "src/app/posts/posts.service";
import { UserModel } from "src/app/users/user.model";

@Component({
    selector: "app-article",
    templateUrl: "./article.component.html",
    styleUrls: [
        "./article.component.scss"
    ]
})
export class ArticleComponent implements OnInit {
    @Input() article: PostUserModel | undefined

    console = console

    countOfLikes$: Observable<number>
    nbLike = 0

    likeMessage: string
    alreadyLike: boolean

    creationDateTxt: string
    updateDateTxt: string

    ownPost: boolean

    constructor(private postsService: PostsService,private cdRef: ChangeDetectorRef){}

    onUpdatePost(){
        this.postsService.getPostToEdit$.next(this.article)
    }

    onDeletePost(){
        this.postsService.hiddeDeletePostConfirmation$.next(this.article.id)
    }

    onLikePost(){
        this.console.log(`Like post avec l'id ${this.article.id}`)
        this.postsService.likePost(this.article.id)
            .pipe(
                tap(message => {
                    this.likeMessage = message
                    setTimeout(() => {
                        this.likeMessage = null
                    }, 2000)
                    this.countOfLikes$ = this.postsService.countPostLike(this.article.id)
                    this.postsService.verifyPostAlreadyLiked(this.article.id)
                        .subscribe(res => {
                            this.alreadyLike = res
                        })
                    this.cdRef.detectChanges()
                })
            )
            .subscribe()
    }

    ngOnInit(): void {
        this.countOfLikes$ = this.postsService.countPostLike(this.article.id)

        this.postsService.verifyPostAlreadyLiked(this.article.id)
            .subscribe(res => {
                this.alreadyLike = res
            })

        const user: UserModel = JSON.parse(localStorage.getItem('user'))
        const userId = user.id
        const isAdmin = user.admin
        if(+userId === +this.article.UserId || isAdmin){
            this.ownPost = true
        }else{
            this.ownPost = false
        }

        const nowDate = new Date(Date.now())
        const nowDay = nowDate.getDate()

        const postCreationDateTime = this.article.creationDate
        const postCreationDate = new Date(postCreationDateTime);
        const postCreationDay = postCreationDate.getDate();

        if(postCreationDay === nowDay){
            this.creationDateTxt = "aujourd'hui"
        }else if(postCreationDay === (nowDay - 1)){
            this.creationDateTxt = "hier"
        }else if(postCreationDay === (nowDay - 2)){
            this.creationDateTxt = "avant-hier"
        }

        const postUpdateDateTime = this.article.updateDate
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
    }
}