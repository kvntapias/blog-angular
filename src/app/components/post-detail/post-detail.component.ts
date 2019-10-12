import { Component, OnInit } from '@angular/core';
import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public post : Post;
  constructor(
    private _postService : PostService,
    private _route: ActivatedRoute,
    private _router : Router
  ) { 
  }

  ngOnInit() {
    this.getPost();
  }

  getPost(){
    //obtener id del post de la url
    this._route.params.subscribe(params => {
      let id = +params['id'];
      
      //sacar datos del post
      this._postService.getPost(id).subscribe(
        res => {
          if (res.status == 'success') {
            this.post = res.posts;
            console.log(this.post);
            
          }else{
            this._router.navigate['/inicio'];
          }
        },
        err => {
          console.log(err);
          this._router.navigate['/inicio'];
        }
      );
    });
  }

}
