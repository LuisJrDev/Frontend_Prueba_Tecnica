import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostDetalles } from '../../models/postDetalles.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listarPosts(page: number, pageSize: number): Observable<{ posts: Post[], totalPosts: number }> {
    return this.http.get<{ posts: Post[], totalPosts: number }>(`${this.apiUrl}/post?page=${page}&pageSize=${pageSize}`);
  }

  detallesPost(id: number): Observable<PostDetalles> {
    return this.http.get<PostDetalles>(`${this.apiUrl}/post/${id}`);
  }

  crearPost(post: Post): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, post);
  }

  editarPost(post: Post, id: number): Observable<any> {
    return this.http.put<Post>(`${this.apiUrl}/post/${id}`, post);
  }

  eliminarPost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/post/${id}`);
  }

  AgregarCategoriasAPost(id: number, categorias: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/post/${id}/categorias`, `"${categorias}"`, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });
  }

}
