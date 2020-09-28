import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent  {
  @ViewChild('drawer') appDrawer: ElementRef;
  @Output() cierreSesion = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  showSubmenu: boolean = false;
  showSubmenuEjemplos: boolean = false;
  panelOpenState = false;
  datos: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private domSanitizer: DomSanitizer,
    public router: Router
  ) {
    this.datos = JSON.parse(localStorage.getItem("datos"));


  }



  cerrarSession() {
    localStorage.setItem('IsIdentity', 'false');
    this.cierreSesion.emit(false);
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
