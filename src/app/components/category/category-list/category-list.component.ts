import { CategoryService } from './../../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  paginatedCategories: Category[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.listarCategory().subscribe(data => {
      this.categories = data;
      this.updatePaginatedCategories();
    });
  }

  updatePaginatedCategories(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedCategories = this.categories.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedCategories();
  }

  editarCategory(category: Category): void {
    this.router.navigate(['/categories/edit', category.categoryId]);
  }

  eliminarCategory(categoryId: number): void {
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
        this.categoryService.eliminarCategory(categoryId).subscribe(response => {
          this.categories = this.categories.filter(category => category.categoryId !== categoryId);
          this.updatePaginatedCategories();
          Swal.fire(
            'Eliminado!',
            'La categoría ha sido eliminada.',
            'success'
          );
        }, error => {
          Swal.fire(
            'Error!',
            'Ocurrió un error al eliminar la categoría.',
            'error'
          );
        });
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.categories.length / this.itemsPerPage);
  }
}
