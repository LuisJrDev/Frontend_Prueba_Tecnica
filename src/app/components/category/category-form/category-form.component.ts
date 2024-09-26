import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryId = id ? +id : null;

    if (this.categoryId) {
      this.categoryService.listarCategory().subscribe(categories => {
        const category = categories.find(cat => cat.categoryId === this.categoryId);
        if (category) {
          this.categoryForm.patchValue(category);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Categoría no encontrada'
          });
          this.router.navigate(['/categories']);
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar las categorías'
        });
        this.router.navigate(['/categories']);
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData = { CategoryId: this.categoryId, ...this.categoryForm.value };

      if (this.categoryId) {
        this.categoryService.editarCategory(categoryData, this.categoryId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Categoría actualizada con éxito'
            });
            this.router.navigate(['/categories']);
          },
          error: (err: any) => {
            this.mostrarErrores(err);
          }
        });
      } else {
        this.categoryService.crearCategory(this.categoryForm.value).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Categoría creada con éxito'
            });
            this.router.navigate(['/categories']);
          },
          error: (err: any) => {
            this.mostrarErrores(err);
          }
        });
      }
    }
  }

  mostrarErrores(errorResponse: any): void {
    if (errorResponse.error.errors) {
      const mensajesErrores = Object.values(errorResponse.error.errors).flat().join('\n');
      Swal.fire({
        icon: 'error',
        title: 'Errores',
        text: mensajesErrores
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado. Intenta nuevamente.'
      });
    }
  }

  get f() {
    return this.categoryForm.controls;
  }
}
