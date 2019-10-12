import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { global } from "../../services/global";
import { UserService } from "../../services/user.service";
import { PostService } from "../../services/post.service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers : [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {
  public pagetitle  : string;
  public category : Category;
  public posts : any;
  public url : string;
  public identity;
  public token;
  
  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _categoryService : CategoryService,
    private _userService : UserService,
    private _postService : PostService, 
  ) { 

    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getPostByCategory();
  }

  getPostByCategory(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._categoryService.getCategory(id).subscribe(
        res => {
          if (res.status == 'success') {
            console.log(res);
            this.category = res.category;
            this._categoryService.getPosts(id).subscribe(
              res => {
                if (res.status == 'success') {
                  this.posts = res.posts;
                }else{
                  this._router.navigate(['/inicio']);
                }
              },
              err => {
                
              }
            );
          }else{
            this._router.navigate(['/inicio']);
          }
        },
        err => {
          console.log(err);
          
        }
      )
    });
  }
  

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      res => {
        this.getPostByCategory();
      }, 
      err => {
        console.log(err);
      }
    );
  }

}
