import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  listarCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}/category`)
  }

  editarCategory(category: Category, id :number): Observable<any>{
    return this.http.put<Category>(`${this.apiUrl}/category/${id}`, category)
  }

  eliminarCategory(id :number):Observable<any>{
    return this.http.delete<Category>(`${this.apiUrl}/category/${id}`)
  }

  crearCategory(category: Category): Observable<any>{
    return this.http.post<Category>(`${this.apiUrl}/category`, category)
  }
}
