import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Post} from '../post.model'
import {PostsService} from '../posts.service'
import {Subscription} from 'rxjs'

// Display the existing posts in DB
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts: Post[] = [];
  constructor(

    public postsService: PostsService) { }
    private subscription: Subscription;

  ngOnInit() {
    // Get all the posts when the app initialized
    this.postsService.getPosts();
    this.subscription = this.postsService.getPostUpdateListener()
    .subscribe(
      (posts: Post[]) => this.posts = posts
    );
  }

  // Delete button pressed on post
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe;
  }
}
