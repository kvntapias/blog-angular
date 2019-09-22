import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import {  UserService } from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [UserService]
})
export class LoginComponent implements OnInit {
  public pagetitle : string;
  public user : User;
  public status : string;
  public token;
  public identity;
  constructor(
    private _userService : UserService,
    private _router : Router,
    private _route : ActivatedRoute,
    
  ) {
    this.pagetitle = "Acceder al sistema";
    this.user = new User(1,'', '', 'ROLE_USER', '','', '', '');
   }

  ngOnInit() {
    //Cerrar sesion solo si llega sure por url
    this.logout();
  }

  onSubmit(form){    
    this._userService.signup(this.user).subscribe(
      response=> {
        //TOKEN
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
              this._userService.signup(this.user, true).subscribe(
                response=> {
                    //IDENTIDAD DEL USUARIO
                    this.identity = response;
                    //persistir datos de login
                    localStorage.setItem(
                      'token', this.token
                    );
                    localStorage.setItem(
                      'identity', JSON.stringify(this.identity)
                    );
                    this._router.navigate(['inicio']);
                }, 
                error => {
                  this.status = 'error';
                  console.log(<any>error);
                }
              );   
        }else{
          this.status = 'error';
        }
      }, error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );    
  }

  logout(){
    this._route.params.subscribe(params=> {
        let logout = +params['sure'];
        if (logout) {
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity = null;
          this.token = null;
          //redireccion a index
          this._router.navigate(['inicio']);
        }
    }); 
  }
}
