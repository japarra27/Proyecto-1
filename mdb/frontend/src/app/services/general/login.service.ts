import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import { LoginModel } from '../../models/general/login';
import 'rxjs/add/observable/throw';
import { environment } from './../../../environments/environment';
//import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public urlBase = '';
  constructor(private http: HttpClient) {
    // this.urlBase = environment.urlBaseServicio;
  }

  iniciarSesion(objCrear: LoginModel) {
    const body = new FormData();
    body.append('email', objCrear.email);
    body.append('password', objCrear.password);
    body.append('username', objCrear.username);
    const url = `${environment.urlBaseServicio}/api/token-auth/`;
    //const url = `http://localhost:3000/token-auth`;
    return this.http.post(url, body);
  }

  crearEmpresa(objCrear: LoginModel) {
    // const authorization = localStorage.getItem('Authorization').toString();
    // const httpOptions = new HttpHeaders().append('Authorization', authorization);
    debugger;
    const body = new FormData();
    body.append('email', objCrear.email);
    body.append('password', objCrear.password);
    body.append('username', objCrear.username);

    // const url = `${this.urlBase}/create-company`;

    const url = `${environment.urlBaseServicio}/api/create-company/`;
    return this.http.post<LoginModel>(url, body);
  }
}
