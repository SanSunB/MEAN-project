import { Component, OnInit, Output } from '@angular/core';
import {Post} from '../post.model';
import {NgForm} from "@angular/forms";
import { PostsService } from '../posts.service';
import { ActivatedRoute } from "@angular/router";

// Adding new posts to DB and post list sview
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{
  post: Post;
  private mode = 'create';
  private postId: string;


  constructor(public postsService: PostsService, public route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onAddPost(form: NgForm) {
    // Auto validation check failed
    if (form.invalid) {
      return;
    }
    // Send input to service for adding the new post
    this.postsService.addPost(form.value.title, form.value.folder, form.value.content);
    // Clear the form fields
    form.resetForm();
  }
}
