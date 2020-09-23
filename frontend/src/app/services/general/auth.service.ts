import { Injectable } from '@angular/core';
// import { LoginModel } from 'src/app/models/general/login';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public urlBase = '';
  constructor(private _http: HttpClient) {
    // this.urlBase = environment.urlBaseServicio;
  }



  isLoggedIn(): boolean {
    let sesion = localStorage.getItem('IsIdentity');

    if (sesion == 'true') {
      return true;
    }

    return false;
  }
}
