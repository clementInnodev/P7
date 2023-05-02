import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Observable, Subscription, of, startWith, switchMap, tap, timer } from 'rxjs';
import { PostModel, PostUserModel } from '../posts/post.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    getPostToEdit$: Subscription

    postDeleteMessage$: Observable<string>
    postUpdateMessage$: Observable<string>

    postToEdit: PostModel | null

    createPost: boolean = false

    constructor(private postsService: PostsService){}

    onCloseForm(){
        this.postToEdit = null
        this.createPost = false
    }

    test(){
        this.createPost = true
    }

    ngOnInit(): void {
        this.postDeleteMessage$ = this.postsService.postDeleteMessage$.pipe(
            tap(res => {
                this.onCloseForm()
            }),
            switchMap((message) => {
                return timer(2000).pipe(
                    switchMap(() => {
                        return of(null);
                    }),
                    startWith(message)
                );
            })
        )

        this.postUpdateMessage$ = this.postsService.postUpdateMessage$.pipe(
            switchMap((message) => {
                return timer(2000).pipe(
                    switchMap(() => {
                        return of(null);
                    }),
                    startWith(message)
                );
            })
        )

        this.getPostToEdit$ = this.postsService.getPostToEdit$.subscribe(post => {
            this.postToEdit = post
        })
    }

    ngOnDestroy(): void {
        this.getPostToEdit$.unsubscribe()
    }
}
