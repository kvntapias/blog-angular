import { Component, OnInit } from '@angular/core';
import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";
import { global } from "../../services/global";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService]
})
export class HomeComponent implements OnInit {
  public pagetitle : string;
  public url;
  public posts : Array<Post>
  constructor(
    private _postService : PostService
  ) { 
    this.pagetitle = 'Inicio';
    this.url = global.url;
  }

  ngOnInit() {
    this.getPosts();
  }


  getPosts(){
    this._postService.getPosts().subscribe(
      res => {
        if (res.status == 'success') {
            this.posts = res.posts;
            console.log(this.posts);
            
        }
      },
      err => {

      }
    );
  }

}
