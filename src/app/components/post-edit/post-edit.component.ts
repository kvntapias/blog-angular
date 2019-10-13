import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { CategoryService } from "../../services/category.service";
import { Post } from "../../models/post";
import {global} from '../../services/global';
import { PostService } from "../../services/post.service";

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers : [UserService,CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  
  public pagetitle  : string;
  public identity;
  public token;
  public post : Post;
  public categories;
  public status;
  public is_edit : boolean;
  public url: string

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService : UserService,
    private _categoryService : CategoryService,
    private _postService : PostService
  ) { 
    this.pagetitle = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
    this.url = global.url;
  }

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
      uploadAPI:  {
        url: global.url+"post/upload",
        headers: {
          "Authorization" : this._userService.getToken()
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      attachPinText : 'Subir imagen'
  };


  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getPost();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;   
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  imageUpload(data){    
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;  
  }

  onSubmit(form){
   this._postService.update(this.token, this.post, this.post.id).subscribe(
     res => {
      if (res.status == 'success') {
        this.status = 'success';
        console.log(res.post);
        
        this._router.navigate(['/entrada', this.post.id]);
      }else{
        this.status = 'error';
      }
     }, 
     err => {
       console.log(<any>err);
       this.status = 'error';
     }
   );   
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
            
            if (this.post.user_id != this.identity.sub) {
              this._router.navigate['/inicio'];
            }
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
