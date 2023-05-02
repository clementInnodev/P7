import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PostUserModel } from '../post.model';
import { PostsService } from '../posts.service';
import { Observable, Subscription, map, tap } from 'rxjs';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild('list', { static: false }) listRef!: ElementRef<HTMLDivElement>
    @ViewChild('bottom', { static: false }) bottomRef!: ElementRef<HTMLDivElement>

    posts$: Observable<PostUserModel[]>
    hiddeDeletePostConfirmation$: Observable<number>

    newPost$: Subscription

    testIndex: number
    testLength: number

    loaded: boolean = false

    constructor(private postsService: PostsService, private cdRef: ChangeDetectorRef){}

    refreshPosts(){
        this.loaded = false
        this.posts$ = this.postsService.getPostsReverse().pipe(
            map(users => {
                const reverseUsers = users.reverse()
                return reverseUsers
            })
        )
        this.cdRef.detectChanges()
    }

    onLoadMorePost(){
        this.postsService.increasePage()
        this.refreshPosts()
    }

    ngOnInit(): void {
        this.refreshPosts()

        this.newPost$ = this.postsService.newPost$
            .pipe(
                map( res => {
                    setTimeout(() => {
                        this.refreshPosts()
                    }, 50)
                })
            )
            .subscribe()

        this.hiddeDeletePostConfirmation$ = this.postsService.hiddeDeletePostConfirmation$
    }

    ngAfterViewChecked(): void {
        if (this.listRef.nativeElement && !this.loaded && this.bottomRef?.nativeElement) {
            this.bottomRef.nativeElement.scrollIntoView({ behavior: 'auto'})
            this.loaded = true
        }
    }

    ngOnDestroy(): void {
        this.newPost$.unsubscribe()
    }
}
