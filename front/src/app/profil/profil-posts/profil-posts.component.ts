import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Observable, Subscription, of, startWith, switchMap, tap, timer } from "rxjs";
import { PostModel } from "src/app/posts/post.model";
import { PostsService } from "src/app/posts/posts.service";


@Component({
    selector: 'app-profil-posts',
    templateUrl: './profil-posts.component.html',
    styleUrls: [
        './profil-posts.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilPostsComponent implements OnInit, AfterViewChecked {
    @ViewChild('list', {static: false}) listRef!: ElementRef<HTMLDivElement>
    @ViewChild('bottom', {static: false}) bottomRef!: ElementRef<HTMLDivElement>

    //récupère tous les posts de l'utilisateur
    posts$: Observable<PostModel[]>

    //si false, à la modification ou suppression d'un post, permettra à la barre d'overflow d'être positionnée en bas
    loaded: boolean = false

    //Gère l'affichage du formulaire de modification
    displayForm: boolean = false


    //permet de récupérer le message de confirmation de suppression d'un post et d'informer de la bonne suppression d'un post
    postDeleteMessage$: Observable<string>
    //contient l'id du post à supprimer
    deletePostId: number

    
    //contient le post à modifier
    postToUpdate: PostModel
    //contient le message de confirmation de modification
    updateMessage: string


    //Gère l'affichage du composant de confirmation de suppression et lui transmet l'id du post à supprimer
    hiddeDeletePostConfirmation$: Observable<number>

    constructor(private postsService: PostsService, private cdRef: ChangeDetectorRef){}

    //déclanché après l'update d'un post
    onPostUpdated(message: string){
        setTimeout(() => {
            this.loaded = false
            this.posts$ = this.postsService.getUserPosts()
            this.cdRef.detectChanges()
        }, 50)
        this.updateMessage = message
        setTimeout(() => {
            this.updateMessage = null
            this.cdRef.detectChanges()
        }, 2000)
        this.onLeaveUpdateMode()
    }

    //déclanché après le clique du bouton d'update d'un post
    onGetPostToUpdate(post: PostModel){
        this.postToUpdate = post
        this.displayForm = true
    }

    //déclanché au clique du bouton d'annulation de modification
    onLeaveUpdateMode(){
        this.postToUpdate = null
        this.displayForm = false
    }

    onPostDeleted(){
        setTimeout(() => {
            this.loaded = false
            this.posts$ = this.postsService.getUserPosts()
            this.cdRef.detectChanges()
        }, 50)
        this.onLeaveUpdateMode()
    }

    ngOnInit(): void {
        this.posts$ = this.postsService.getUserPosts()

        this.postDeleteMessage$ = this.postsService.postDeleteMessage$.pipe(
            tap(res => {
                this.onPostDeleted()
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

        this.hiddeDeletePostConfirmation$ = this.postsService.hiddeDeletePostConfirmation$
    }

    ngAfterViewChecked(): void {
        if(this.listRef && this.bottomRef && !this.loaded){
            this.bottomRef.nativeElement.scrollIntoView({behavior: 'auto'})
            this.loaded = true
        }
    }
}