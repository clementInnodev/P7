import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Observable, of, startWith, switchMap, timer } from 'rxjs';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: [
        './posts.component.scss'
    ]
})
export class PostsComponent implements OnInit {
    postDeleteMessage$: Observable<string>
    postUpdateMessage$: Observable<string>

    constructor(private postsService: PostsService){}

    ngOnInit(): void {
        this.postDeleteMessage$ = this.postsService.postDeleteMessage$.pipe(
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
    }
}
