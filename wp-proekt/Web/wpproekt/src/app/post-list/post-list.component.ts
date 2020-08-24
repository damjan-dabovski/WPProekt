import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Post } from '../models/Post'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  
  constructor(private service: ApiService) { }

  posts: Post[]

  ngOnInit(): void {
    this.service.getPosts().subscribe((data) => {
      this.posts = data
      console.log(data)
    })
  }

}
