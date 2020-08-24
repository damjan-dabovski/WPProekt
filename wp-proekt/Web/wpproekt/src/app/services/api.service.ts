import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../helpers/constants'
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl: string = Constants.baseUrl;

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseUrl}/posts`)
  }

  getPost(id: number): Observable<Post>{
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`)
  }

  postPost(post: Post): void{
    this.http.post(`${this.baseUrl}/posts`, post, {
      headers: { uid: "testUid" }
    }).subscribe(response => console.log(response))
  }

  putPost(post: Post): void{
    this.http.put(`${this.baseUrl}/posts`, post, {
      headers: { uid: "testUid"}
    }).subscribe(response => console.log(response))
  }

  deletePost(id: number): void{
    this.http.delete(`${this.baseUrl}/posts/${id}`, {
      headers: { uid: "testUid" }
    }).subscribe(response => console.log(response))
  }
}
