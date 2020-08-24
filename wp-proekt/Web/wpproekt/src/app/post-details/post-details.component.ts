import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post } from '../models/Post';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor(private service: ApiService, private route: ActivatedRoute) { }

  postId: number
  post: Post

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id']
      this.service.getPost(this.postId).subscribe(data => {
        this.post = data
        console.log(data)
      })
    })
  }

  deletePost(){
    this.service.deletePost(this.post.id)
  }

}
