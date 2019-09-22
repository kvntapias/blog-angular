import {Injectable} from '@angular/core'
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../models/user';
import {global} from './global';

@Injectable()
export class UserService{
    public url : string;
    public headers : HttpHeaders;
    constructor(
        public _http :HttpClient   
    ){
        this.url = global.url
        this.headers = new HttpHeaders().set('Content-Type', 'Application/x-www-form-urlencoded');
    }

    register(user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        return this._http.post(this.url+'register', params, {headers:this.headers});
    }

    signup(user, getToken = null) : Observable<any>{
        if (getToken != null) {
            user.getToken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;
        return this._http.post(this.url+'login', params, {headers:this.headers});
    }
}