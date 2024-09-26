import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../models/post.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPosts: number = 0;
  totalPages: number = 0;

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.listarPosts(this.currentPage, this.pageSize).subscribe(response => {
      this.posts = response.posts;
      this.totalPosts = response.totalPosts;
      this.totalPages = Math.ceil(this.totalPosts / this.pageSize);
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPosts();
    }
  }

  editarPost(post: Post): void {
    this.router.navigate(['/posts/edit', post.postId]);
  }

  navigateToPost(postId: number) {
    this.router.navigate(['/posts', postId]);
  }

  eliminarPost(postId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.eliminarPost(postId).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'El post ha sido eliminado.',
              'success'
            );

            this.posts = this.posts.filter(post => post.postId !== postId);
            this.totalPosts--;
            this.totalPages = Math.ceil(this.totalPosts / this.pageSize);

            if (this.posts.length === 0 && this.currentPage > 1) {
              this.onPageChange(this.currentPage - 1);
            }
          },
          error: () => {
            Swal.fire(
              'Error!',
              'Error al eliminar el post. Intenta nuevamente.',
              'error'
            );
          }
        });
      }
    });
  }
}
