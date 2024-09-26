import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postId = id ? +id : null;

    if (this.postId) {
      this.postService.detallesPost(this.postId).subscribe(
        post => {
          this.postForm.patchValue(post);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar el post. Intenta nuevamente.'
          });
          this.router.navigate(['/posts']);
        }
      );
    }
  }

  onSubmit(): void {
    console.log('Formulario enviado:', this.postForm.value);

    if (this.postForm.valid) {
      const postData = { PostId: this.postId, ...this.postForm.value };

      if (this.postId) {
        this.postService.editarPost(postData, this.postId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Post actualizado con éxito'
            });
            this.router.navigate(['/posts']);
          },
          error: (err: any) => {
            this.mostrarErrores(err);
          }
        });
      } else {
        this.postService.crearPost(this.postForm.value).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Post creado con éxito'
            });
            this.router.navigate(['/posts']);
          },
          error: (err: any) => {
            this.mostrarErrores(err);
          }
        });
      }
    } else {
      console.log('Formulario no válido', this.postForm.errors);
    }
  }

  mostrarErrores(errorResponse: any): void {
    let errorMessage = 'Ocurrió un error inesperado. Intenta nuevamente.';
    if (errorResponse.error.errors) {
      const mensajesErrores = Object.values(errorResponse.error.errors).flat().join('\n');
      errorMessage = mensajesErrores;
    }

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage
    });
  }

  get f() {
    return this.postForm.controls;
  }
}
