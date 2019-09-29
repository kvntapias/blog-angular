import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Category } from "../../models/category";

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers : [UserService]
})
export class CategoryNewComponent implements OnInit {

  public pagetitle :string;
  public identity;
  public token;
  public category : Category;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService : UserService
  ) {
    this.pagetitle = 'Nueva categoria';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1,'');
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.category);
  }

}
