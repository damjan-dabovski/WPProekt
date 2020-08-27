import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../helpers/constants'
import { Post } from '../models/Post';
import { AuthService } from './auth.service';
import { Product } from '../models/Product';
import { Tag } from '../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  baseUrl: string = Constants.baseUrl;
  get uid(): string{
    return this.authService.user?.uid || ""
  }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseUrl}/posts`)
  }

  getPost(id: number): Observable<Post>{
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`)
  }

  postPost(post: Post): void{
    this.http.post(`${this.baseUrl}/posts`, post, {
      headers: { uid: this.uid }
    }).subscribe(response => console.log(response))
  }

  putPost(post: Post): void{
    this.http.put(`${this.baseUrl}/posts`, post, {
      headers: { uid: this.uid }
    }).subscribe(response => console.log(response))
  }

  deletePost(id: number): void{
    this.http.delete(`${this.baseUrl}/posts/${id}`, {
      headers: { uid: this.uid }
    }).subscribe(response => console.log(response))
  }

  postUser(uid: string, userName: string, role: number){
    this.http.post(`${this.baseUrl}/users`, {
      uid: uid,
      userName: userName,
      role: role
    }).subscribe(response => console.log(response))
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/products`)
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
  }

  postProduct(product: Product): void{
    this.http.post(`${this.baseUrl}/products`, product, {
      headers: { uid: this.uid }
    }).subscribe(response => console.log(response))
  }

  deleteProduct(id: number): void{
    this.http.delete(`${this.baseUrl}/products/${id}`, {
      headers: { uid: this.uid }
    }).subscribe(response => console.log(response))
  }

  getTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(`${this.baseUrl}/tags`)
  }

  addTagToPost(postId: number, tagId:number){
    this.http.post(`${this.baseUrl}/posts/${postId}/tags`, tagId, {
      headers: { uid: "admin" }
    }).subscribe(response => console.log(response))
  }
}
