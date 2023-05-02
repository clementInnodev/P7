import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { tap } from "rxjs";
import { PostModel, PostUpdateModel } from "src/app/posts/post.model";
import { PostsService } from "src/app/posts/posts.service";

@Component({
    selector: 'app-profil-posts-form',
    templateUrl: './profil-posts-form.component.html',
    styleUrls: [
        './profil-posts-form.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilPostsFormComponent {
    @Input() postToEdit: PostModel
    @Input() postToEditTitle: string
    @Input() postToEditContent: string
    @Input() postToEditImageUrl: string

    @Output() leaveUpdateModeEvent = new EventEmitter<void>()
    @Output() postModifyEvent = new EventEmitter<string>()

    image: File

    constructor(private postsService: PostsService){}

    onFileSelected(event: Event){

    }

    onSubmitForm(f: NgForm){
        if(f.valid){
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
                        f.resetForm()
                        this.postModifyEvent.emit(message)
                    })
                )
                .subscribe()
        }
    }

    onLeaveUpdate(){
        this.leaveUpdateModeEvent.emit()
    }
}