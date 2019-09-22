import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import {  UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [UserService]
})
export class LoginComponent implements OnInit {
  public pagetitle : string;
  public user : User;
  constructor(
    private _userService : UserService
  ) {
    this.pagetitle = "Acceder al sistema";
    this.user = new User(1,'', '', 'ROLE_USER', '','', '', '');

   }

  ngOnInit() {
  }

  onSubmit(form){
    
  }

}
