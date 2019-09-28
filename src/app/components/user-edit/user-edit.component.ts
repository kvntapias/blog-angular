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
  public status;

  constructor(
    private _userService : UserService 
  ) {
    this.pagetitle = 'Ajustes de usuario';
    this.user = new User(1,'', '', 'ROLE_USER', '','', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(this.identity.sub,
                      this.identity.name,
                      this.identity.surname,
                      this.identity.role,
                      this.identity.email,
                      '',
                      this.identity.description,
                      this.identity.image
      );
  }

  ngOnInit() {
  }

  onSubmit(form){
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          for (var prop in response.changes) {
              this.user.prop = response.changes[prop];              
          }
          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
