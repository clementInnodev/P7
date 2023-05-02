import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { PostsService } from './posts/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('list', { static: false }) listRef!: ElementRef<HTMLDivElement>

  getPostToEdit$: Subscription

  constructor(private postsService: PostsService){}

  ngOnInit(): void {
      this.getPostToEdit$ = this.postsService.getPostToEdit$
        .subscribe(res => {
          this.listRef.nativeElement.scrollTop = 0
        })
  }

  ngOnDestroy(): void {
      this.getPostToEdit$.unsubscribe()
  }
}
