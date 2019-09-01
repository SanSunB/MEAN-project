import { Component, OnInit, Output } from '@angular/core';
import {Post} from '../post.model';
import {NgForm} from "@angular/forms";
import { PostsService } from '../posts.service';

// Adding new posts to DB and view
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent{
  onAddPost(form: NgForm) {
    // Auto validation check faild
    if (form.invalid) {
      return;
    }
    // Send input to service for adding the new post
    this.postsService.addPost(form.value.title, form.value.content);
    // Clear the form fields
    form.resetForm();
  }

  constructor(public postsService: PostsService){}
}
