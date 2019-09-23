import { NgModule,Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NewPostComponent } from './posts/new-post/new-post.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: NewPostComponent},
  {path: 'edit/:postId', component: NewPostComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
