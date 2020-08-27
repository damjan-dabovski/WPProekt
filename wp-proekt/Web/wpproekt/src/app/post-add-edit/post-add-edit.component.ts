import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post } from '../models/Post';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../models/Tag';

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

  tags: Tag[]
  selectedTags: boolean[] = []

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

      this.service.getTags().subscribe(data => {
        this.tags = data
        console.log(this.tags)
        for(let tag of this.tags){
          this.selectedTags.push(false)
        }
      })
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

  getColor(tagColor: string){
    return "#" + tagColor
  }

  toggleTagSelect(i: number){
    this.selectedTags[i] = !this.selectedTags[i]
    console.log(this.selectedTags)
  }

}
