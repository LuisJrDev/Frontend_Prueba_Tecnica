import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:5228/api/category'

  constructor(private http: HttpClient) {}

  listarCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}`)
  }

  editarCategory(category: Category, id :number): Observable<any>{
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category)
  }

  eliminarCategory(id :number):Observable<any>{
    return this.http.delete<Category>(`${this.apiUrl}/${id}`)
  }

  crearCategory(category: Category): Observable<any>{
    return this.http.post<Category>(`${this.apiUrl}`, category)
  }
}
