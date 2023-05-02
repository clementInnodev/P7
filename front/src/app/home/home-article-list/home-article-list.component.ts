import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject, Observable, Subject, Subscription, takeUntil } from "rxjs";
import { PostUserModel } from "src/app/posts/post.model";
import { PostsService } from "src/app/posts/posts.service";

@Component({
    selector: "app-home-article-list",
    templateUrl: "./home-article-list.component.html",
    styleUrls: [
        "./home-article-list.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeArticleListComponent implements OnInit, OnDestroy {
    articles$: Observable<PostUserModel[]>
    hiddeDeletePostConfirmation$: Observable<number>

    newPost$: Subscription

    postDeleteMessage: string

    constructor(private postsService: PostsService, private cdRef: ChangeDetectorRef){}

    refreshPosts(){
        this.articles$ = this.postsService.getPostsReverse()
        this.cdRef.detectChanges()
    }

    ngOnInit(): void {
        this.articles$ = this.postsService.getPostsReverse()

        this.newPost$ = this.postsService.newPost$
            .subscribe(res => {
                setTimeout(()=>{
                    this.refreshPosts()
                }, 50)
            })

        this.hiddeDeletePostConfirmation$ = this.postsService.hiddeDeletePostConfirmation$
    }

    ngOnDestroy(): void {
        this.newPost$.unsubscribe()
    }
}