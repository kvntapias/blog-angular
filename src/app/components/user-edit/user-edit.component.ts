import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers : [UserService]
})
export class UserEditComponent implements OnInit {

  public pagetitle : string;
  public user : User;
  public identity;
  public token;

  constructor(
    private _userService : UserService 
  ) {
    this.pagetitle = 'Ajustes de usuario';
    this.user = new User(1,'', '', 'ROLE_USER', '','', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
  }

  ngOnInit() {
  }

}
