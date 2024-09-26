import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostDetalles } from '../../models/postDetalles.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5228/api/post';

  constructor(private http: HttpClient) { }

  listarPosts(page: number, pageSize: number): Observable<{ posts: Post[], totalPosts: number }> {
    return this.http.get<{ posts: Post[], totalPosts: number }>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  detallesPost(id: number): Observable<PostDetalles> {
    return this.http.get<PostDetalles>(`${this.apiUrl}/${id}`);
  }

  crearPost(post: Post): Observable<any> {
    return this.http.post(`${this.apiUrl}`, post);
  }

  editarPost(post: Post, id: number): Observable<any> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  eliminarPost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  AgregarCategoriasAPost(id: number, categorias: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${id}/categorias`, `"${categorias}"`, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });
  }

}
