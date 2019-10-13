import { Component, OnInit } from '@angular/core';
import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";
import { global } from "../../services/global";
import { UserService } from "../../services/user.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService,UserService]
})
export class ProfileComponent implements OnInit {
  public url;
  public posts : Array<Post>;
  public identity;
  public token;
  public user : User;

  constructor(
    private _postService : PostService, 
    private _userService : UserService,
    private _route: ActivatedRoute,
    private _router : Router
  ) { 
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getProfile();
  }

  getUser(userId){
    this._userService.getUser(userId).subscribe(
      res => {
        if (res.status == 'success') {
            this.user = res.user;
            console.log("EL USUARIO ES:"+this.user);
            
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  
  getPosts(userId){
    this._userService.getPosts(userId).subscribe(
      res => {
        if (res.status == 'success') {
            this.posts = res.posts;
            console.log(this.posts);
            
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getProfile(){
    this._route.params.subscribe(params => {
      let userId = +params['id'];
      this.getPosts(userId);
      this.getUser(userId);
    });
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      res => {
        this.getProfile();
      }, 
      err => {
        console.log(err);
      }
    );
  }
}