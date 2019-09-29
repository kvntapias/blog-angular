import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { CategoryService } from "../../services/category.service";
import { Post } from "../../models/post";
import {global} from '../../services/global';
import { PostService } from "../../services/post.service";

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers : [UserService,CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService : UserService,
    private _categoryService : CategoryService,
    private _posrService : PostService
  ) { 
    this.pagetitle = 'Crear entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public pagetitle  : string;
  public identity;
  public token;
  public post : Post;
  public categories;
  public status;

  public froala_options: Object = {
    charCounterCount: true,
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
   this._posrService.create(this.token, this.post).subscribe(
     res => {
      if (res.status == 'success') {
        this.post = res.post;
        this.status = 'success'
        this._router.navigate(['inicio']);
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
}
