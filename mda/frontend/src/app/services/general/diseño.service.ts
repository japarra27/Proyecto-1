import { Injectable } from '@angular/core';
import { DiseñoModel } from '../../../app/models/general/diseño';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
//import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DiseñoService {
  public urlBase = '';
  dialogData: DiseñoModel;
  dataChange: BehaviorSubject<DiseñoModel[]> = new BehaviorSubject<DiseñoModel[]>([]);
  constructor(private httpClient: HttpClient) {
    // this.urlBase = environment.urlBaseServicio;
  }

  get data(): DiseñoModel[] {
    return this.dataChange.value;
  }

  obtenerDiseños(): Observable<DiseñoModel[]> {
    const authorization = localStorage.getItem('Authorization');
    const httpOptions = new HttpHeaders().append('authorization', `${authorization}`);
    const url = `${environment.urlBaseServicio}/api/projects/2/designs/`;
    return this.httpClient.get<DiseñoModel[]>(url, { headers: httpOptions });
  }

  // tslint:disable-next-line: typedef
  crearDiseño(diseño: any, archivo: File) {
    const authorization = localStorage.getItem('Authorization');
    const httpOptions = new HttpHeaders().append('authorization', `${authorization}`);
    const body = new FormData();
    body.append('designer_first_name', diseño.name);
    body.append('designer_last_name', diseño.lastName);
    body.append('designer_email', diseño.email);
    body.append('design_price', diseño.price);
    body.append('design_file', archivo);
    // const url = `${this.urlBase}/crearDisenios`;
    const url = `${environment.urlBaseServicio}/api/projects/2/designs/`;
    return this.httpClient.post<DiseñoModel>(url, body, { headers: httpOptions });
  }


  modificarDiseño(diseño: DiseñoModel): Observable<DiseñoModel[]> {
    const authorization = localStorage.getItem('Authorization');
    const httpOptions = new HttpHeaders().append('authorization', `${authorization}`);
    const url = `${environment.urlBaseServicio}/disenos`;
    return this.httpClient.get<DiseñoModel[]>(url, { headers: httpOptions });
  }

  // tslint:disable-next-line: typedef
  eliminarDiseño(id: string) {
    const authorization = localStorage.getItem('Authorization');
    const httpOptions = new HttpHeaders().append('authorization', `${authorization}`);
    const url = `${environment.urlBaseServicio}/api/projects/2/designs/${id}/`;
    return this.httpClient.delete(url, { headers: httpOptions });
  }
  // tslint:disable-next-line: typedef
  getDialogData() {
    return this.dialogData;
  }

}
