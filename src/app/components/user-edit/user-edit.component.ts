import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public pagetitle : string;
  public user : User;

  constructor() { 
    this.pagetitle = 'Ajustes de usuario';
    this.user = new User(1,'', '', 'ROLE_USER', '','', '', '');
  }

  ngOnInit() {
  }

}
