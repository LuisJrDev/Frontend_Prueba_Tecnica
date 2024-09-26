import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:5228/api/comment'

  constructor(private http: HttpClient) { }

  crearComment(comment: Comment): Observable<any>{
    return this.http.post<Comment>(`${this.apiUrl}`, comment)
  }

  editarComment(comment: Comment): Observable<any>{
    return this.http.put<Comment>(`${this.apiUrl}`, comment)
  }

  eliminarComment(id: number): Observable<any>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
