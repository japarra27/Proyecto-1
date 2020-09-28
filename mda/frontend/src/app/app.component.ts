import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public general: boolean;
  public login: boolean = true;
  title = 'lbPeriferiaAngular10';
  empresa: string;

  constructor(private router: Router) {
    this.general = false;
    this.eventoSesion();
  }

  eventoSesion() {
    let a = localStorage.getItem('IsIdentity');
    if (a == 'false') {
      this.login = true;
      this.general = false;
    } else if (a == 'true') {
      this.general = true;
      this.login = false;
      this.router.navigate(['/home']);
    }

    // "usuario" es el que estas recibiendo desde el hijo,
    // asignalo a una propiedad que este asociada al input con ngModel o ve que haces con el
  }
}
