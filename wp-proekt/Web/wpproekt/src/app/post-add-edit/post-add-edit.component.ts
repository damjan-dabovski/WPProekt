import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post } from '../models/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-add-edit',
  templateUrl: './post-add-edit.component.html',
  styleUrls: ['./post-add-edit.component.css']
})
export class PostAddEditComponent implements OnInit {

  constructor(private service: ApiService, private route: ActivatedRoute) { }

  postId: number;
  post: Post;
  bEditEnabled: boolean = false;

  @Input()
  postTitle: string;
  @Input()
  postContent: string;
  @Input()
  isDraft: boolean;
  @Input()
  bPreviewEnabled: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id']
      if(this.postId){

        this.bEditEnabled = true

        this.service.getPost(this.postId).subscribe(data => {
          this.post = data
          this.postTitle = this.post.title
          this.postContent = this.post.content
          this.isDraft = this.post.isDraft
        })
      }
    })
  }

  submitPost(){
    if(this.bEditEnabled){
      console.log("Sending PUT request...")
      this.service.putPost({
        id: this.post.id,
        title: this.postTitle,
        content: this.postContent,
        authorName: this.post.authorName,
        isDraft: false
      })
    } else {
      console.log("Sending POST request...")
      this.service.postPost({
        title: this.postTitle,
        authorName: "Admin",
        content: this.postContent,
        isDraft: false
      })
    }
  }

}
