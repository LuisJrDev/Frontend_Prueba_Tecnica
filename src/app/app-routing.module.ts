import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'posts/create', component: PostFormComponent },
  { path: 'posts/edit/:id', component: PostFormComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/create', component: CategoryFormComponent },
  { path: 'categories/edit/:id', component: CategoryFormComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
