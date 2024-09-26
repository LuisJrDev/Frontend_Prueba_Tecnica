import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post/post.service';
import { CommentService } from '../../../services/comment/comment.service';
import { Category, PostDetalles } from '../../../models/postDetalles.model';
import { Comment } from '../../../models/comment.model';
import { CategoryService } from '../../../services/category/category.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post: PostDetalles | null = null;
  postId: number = 0;
  allCategories: Category[] = [];
  selectedCategories: string[] = [];
  newComment: Comment = {
    commentId: 0,
    postId: 0,
    content: '',
    createdAt: new Date()
  };

  showCategorySelector: boolean = false;
  originalCommentContent: string = '';
  originalSelectedCategories: string[] = [];

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.postId = Number(id);
        this.loadPostDetails();
        this.loadCategories();
        this.newComment.postId = this.postId;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'ID de post no proporcionado en la URL'
        });
      }
    });
  }

  loadPostDetails(): void {
    if (this.postId) {
      this.postService.detallesPost(this.postId).subscribe(
        post => {
          this.post = post;
          if (!this.post.comentarios) {
            this.post.comentarios = [];
          }

          this.selectedCategories = this.post.categorias.map(category => category.categoryId.toString());
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar los detalles del post'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID del post no es válido'
      });
    }
  }

  onCategorySelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategories = Array.from(selectElement.selectedOptions).map(option => option.value);
  }

  loadCategories(): void {
    this.categoryService.listarCategory().subscribe(
      (data) => {
        this.allCategories = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar las categorías'
        });
      }
    );
  }

  addCategoriesToPost(): void {
    const categorias = this.selectedCategories.join(',');
    this.postService.AgregarCategoriasAPost(this.postId, categorias).subscribe(
      () => {
        this.loadPostDetails();
        this.closeCategoryModal();
        this.selectedCategories = [];
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Categorías añadidas con éxito'
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al añadir categorías'
        });
      }
    );
  }

  openCategoryModal(): void {

    this.originalSelectedCategories = [...this.selectedCategories];

    const modalElement = document.getElementById('categoryModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  isSelected(categoryId: string): boolean {
    return this.selectedCategories.includes(categoryId);
  }

  closeCategoryModal(): void {
    const modalElement = document.getElementById('categoryModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }

    this.selectedCategories = [...this.originalSelectedCategories];
  }

  onSubmitComment(): void {
    if (this.newComment.content.trim()) {
      this.commentService.crearComment(this.newComment).subscribe(
        (comment: Comment) => {
          if (this.post) {
            this.post.comentarios.push({
              commentId: comment.commentId,
              content: comment.content,
              postId: comment.postId,
              createdAt: new Date(comment.createdAt),
            });
            this.newComment.content = '';
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Comentario añadido con éxito'
            });
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al agregar el comentario'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'El contenido del comentario no puede estar vacío'
      });
    }
  }

  onDeleteComment(commentId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService.eliminarComment(commentId).subscribe(
          () => {
            if (this.post) {
              this.post.comentarios = this.post.comentarios.filter(comment => comment.commentId !== commentId);
              Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Comentario eliminado con éxito'
              });
            }
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al eliminar el comentario'
            });
          }
        );
      }
    });
  }

  onEditComment(comment: Comment): void {
    this.originalCommentContent = comment.content;
    comment.isEditing = true;
  }

  onCancelEdit(comment: Comment): void {
    comment.content = this.originalCommentContent;
    comment.isEditing = false;
  }

  onUpdateComment(comment: Comment): void {
    if (comment.content.trim() === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'El contenido del comentario no puede estar vacío'
        });
        return;
    }

    this.commentService.editarComment(comment).subscribe(
        () => {
            comment.isEditing = false;
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Comentario actualizado con éxito'
            });
        },
        error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el comentario'
            });
        }
    );
}

}
