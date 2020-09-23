import { Injectable } from '@angular/core';
import { DiseñoModel } from '../../models/general/diseño';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProyectoModel } from '../../models/general/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  public urlBase = '';
  dialogData: DiseñoModel;
  dataChange: BehaviorSubject<ProyectoModel[]> = new BehaviorSubject<ProyectoModel[]>([]);
  constructor(private httpClient: HttpClient) {
    // this.urlBase = environment.urlBaseServicio;
  }

  get data(): ProyectoModel[] {
    return this.dataChange.value;
  }

  obtenerProyectos(): Observable<ProyectoModel[]> {
    const authorization = localStorage.getItem('Authorization');
    const httpOptions = new HttpHeaders().append('authorization', `${authorization}`);
    debugger;
    const url = `${environment.urlBaseServicio}/api/projects/`;
    // const url = `${this.urlBase}/proyects`;
    return this.httpClient.get<ProyectoModel[]>(url, { headers: httpOptions });
  }

  // tslint:disable-next-line: typedef
  crearProyecto(proyecto: any) {
    const authorization = localStorage.getItem('Authorization');
    const httpOptions = new HttpHeaders().append('authorization', `${authorization}`);

    const body = new FormData();
    body.append('project_name', proyecto.nameProyect);
    body.append('project_description', proyecto.descriptionProyect);
    body.append('project_price', proyecto.price);

    const url = `${environment.urlBaseServicio}/api/projects/`;
    // const url = `${this.urlBase}/crearProjects`;
    return this.httpClient.post<ProyectoModel>(url, body, { headers: httpOptions });
  }

  modificarProyecto(proyecto): Observable<ProyectoModel[]> {
    const authorization = localStorage.getItem('Authorization');
    const httpOptions = new HttpHeaders().append('authorization', `${authorization}`);

debugger;
    const body = new FormData();
    body.append('project_name', proyecto.name);
    body.append('project_description', proyecto.descripccion);
    body.append('project_price', proyecto.precio);
    const url = `${environment.urlBaseServicio}/api/projects/${proyecto.id}/`;
    return this.httpClient.put<ProyectoModel[]>(url, body, { headers: httpOptions });



  }
  // tslint:disable-next-line: typedef
  eliminarProyecto(id: string) {
    debugger;
    const authorization = localStorage.getItem('Authorization');
    const httpOptions = new HttpHeaders().append('authorization', `${authorization}`);
    const url = `${environment.urlBaseServicio}/api/projects/${id}/`;
    // const url = `${this.urlBase}/users/${id}`;
    return this.httpClient.delete(url, { headers: httpOptions });
  }

  // tslint:disable-next-line: typedef
  getDialogData() {
    return this.dialogData;
  }

}
