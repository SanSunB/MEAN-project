import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

// Handle post operations to the DB
@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  // Get all posts
  getPosts() {
    this.http.get<{message: string, posts: any}>
    ('http://localhost:3000/api/posts')
    .pipe(
      map(postData => {
        return postData.posts.map(post => {
          return {
            // Convert the _id we get from mongoDB to id fdels
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      })
    ).subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      // Send a copy of the posts array without changing the source
      this.postUpdated.next([...this.posts]);
    });
  }

  // Listen to changes in post updated
  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  // Add a new post
  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    // Post request to DB to add a new post
    this.http.post<{message: string, postId: string }>
    ('http://localhost:3000/api/posts', post).subscribe((resData) => {
      // Update the current view with the new post
      const postId = resData.postId;
      post.id = postId;
      this.posts.push(post);
      // Signal new post update
      this.postUpdated.next([...this.posts]);
    });
  }

  // Delete an existing post by id
  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe( () => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }
}
