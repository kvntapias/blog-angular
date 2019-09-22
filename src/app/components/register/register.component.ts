import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import {  UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

  providers: [UserService]

})
export class RegisterComponent implements OnInit {
  public pagetitle : string;
  public status : string;
  public user : User;

  constructor(
    private _userService : UserService
  ){
    this.pagetitle = "Registro de usuario";
    this.user = new User(1,'', '', 'ROLE_USER', '','', '', '');
  }

  ngOnInit() {

  }

  onSubmit(form){
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
        }else{
          this.status = "error";
        }
        form.reset();    
      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }
}
