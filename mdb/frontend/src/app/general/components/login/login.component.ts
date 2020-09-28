import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginModel } from '../../../models/general/login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/general/login.service';
import { element } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() eventoSesion = new EventEmitter();
  @Output() empresa = new EventEmitter();
  public frmSesion: FormGroup;
  public frmEmpresas: FormGroup;
  public objlogin: LoginModel;
  public objCrear: LoginModel;
  empresaCrear: boolean;
  login: boolean = true;
  public vistas: string[] = [];
  returnUrl: string;
  usuarios: string[] = [];
  constructor(
    public _login: LoginService,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.login = true;
  }

  ngOnInit() {
    this.validaciones();
    this.returnUrl = this.route.snapshot.queryParams['home'] || '/';
  }

  iniciarSesion(objEmpresa?: LoginModel) {

    if (objEmpresa == undefined) {
      this.objlogin = this.frmSesion.value;
    } else {
      this.objlogin = objEmpresa;
    }

    debugger;
    this._login.iniciarSesion(this.objlogin).subscribe((res: any) => {
      console.log(res);
      const token = res.token.toString();
      localStorage.setItem('Authorization', 'token ' + token);


      if (res.token !== '') {
        localStorage.setItem('IsIdentity', 'true');
        // this.router.navigate([this.returnUrl]);
        this.eventoSesion.emit(true);

        this._snackBar.open('Bienvenido', 'Undo', {
          duration: 3000,
        });
      } else {
        alert('lo siento');
      }
    }, (error: HttpErrorResponse) => {
      console.log('error servicio', error.message);
      console.error('error servicio', error);
      alert('error en el servicio');
    });
  }


  crearEmpresa() {
    this.objCrear = this.frmEmpresas.value;

    debugger;
    this._login.crearEmpresa(this.objCrear).subscribe((res) => {
      console.log(res);


      this.iniciarSesion(this.objCrear);
    } ,(error: HttpErrorResponse) => {
      console.log('error servicio', error.message);
      console.error('error servicio', error);
      alert('error al crear empresa ');
    });



  }

  validaciones() {
    this.frmSesion = this.formBuilder.group({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
    });

    this.frmEmpresas = this.formBuilder.group({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  botonCrearEmpresa() {
    this.empresaCrear = true;
    this.login = false;
  }

  Volver() {
    this.empresaCrear = false;
    this.login = true;
  }
}
