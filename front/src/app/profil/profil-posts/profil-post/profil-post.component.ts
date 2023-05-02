import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from "@angular/core";
import { PostModel } from "src/app/posts/post.model";
import { PostsService } from "src/app/posts/posts.service";

@Component({
    selector: 'app-profil-post',
    templateUrl: './profil-post.component.html',
    styleUrls: [
        './profil-post.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilPostComponent implements OnInit {
    @Input() post: PostModel

    @Output() clickOnUpdatePostEvent = new EventEmitter<PostModel>()

    creationDateTxt: string
    updateDateTxt: string

    constructor(private postsService: PostsService){}

    onUpdatePost(){
        this.clickOnUpdatePostEvent.emit(this.post)
    }

    onDeletePost(){
        this.postsService.hiddeDeletePostConfirmation$.next(this.post.id)
    }

    ngOnInit(): void {
        const nowDate = new Date(Date.now())
        const nowDay = nowDate.getDate()

        const postCreationDateTime = this.post.creationDate
        const postCreationDate = new Date(postCreationDateTime);
        const postCreationDay = postCreationDate.getDate();

        if(postCreationDay === nowDay){
            this.creationDateTxt = "aujourd'hui"
        }else if(postCreationDay === (nowDay - 1)){
            this.creationDateTxt = "hier"
        }else if(postCreationDay === (nowDay - 2)){
            this.creationDateTxt = "avant-hier"
        }

        const postUpdateDateTime = this.post.updateDate
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