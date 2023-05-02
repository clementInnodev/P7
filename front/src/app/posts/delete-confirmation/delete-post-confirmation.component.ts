import { Component, Input } from "@angular/core";
import { PostsService } from "../posts.service";

@Component({
    selector: "app-delete-post-confirmation",
    templateUrl: "./delete-post-confirmation.component.html",
    styleUrls: [
        "./delete-post-confirmation.component.scss"
    ]
})
export class DeletePostConfirmationComponent {
    @Input() postId: number

    constructor(private postsService: PostsService){}

    onHiddeDeletePostConfirmation(){
        this.postsService.hiddeDeletePostConfirmation$.next(null)
    }

    onConfirmDeletePost(){
        this.postsService.deletePost(this.postId)
            .subscribe()
    }
}