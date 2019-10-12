import { Component, OnInit } from '@angular/core';
import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";
import { global } from "../../services/global";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService,UserService]
})
export class HomeComponent implements OnInit {
  public pagetitle : string;
  public url;
  public posts : Array<Post>;
  public identity;
  public token;
  constructor(
    private _postService : PostService, 
    private _userService : UserService
  ) { 
    this.pagetitle = 'Inicio';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      res => {
        this.getPosts();
      }, 
      err => {
        console.log(err);
      }
    );
  }
}
