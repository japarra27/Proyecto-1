import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProyectoService } from '../../../services/general/proyecto.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-eliminar-proyecto',
  templateUrl: './eliminar-proyecto.component.html',
  styleUrls: ['./eliminar-proyecto.component.scss'],
})
export class EliminarProyectoComponent implements OnInit {
  form: FormGroup;
  titulo = 'Eliminar Proyecto';
  proyectoSelecionado: any;
  constructor(
    public proyectoService: ProyectoService,
    public dialogRef: MatDialogRef<EliminarProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataSource: any
  ) {
    this.proyectoSelecionado = this.dataSource.proyecto;
  }

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  borrarProyecto() {
    this.proyectoService
      .eliminarProyecto(this.proyectoSelecionado.id)
      .subscribe((res) => {
        debugger;
        // this.usuarioSeleccionado = res;
      }, (error: HttpErrorResponse) => {
        console.error('error servicio' + error);
        console.log('mesaje error:' + error.message);
        if (error.message.includes('404')) {
          alert('Error en el servicio eliminar proyecto, no se puede eliminar ya que no pertenece a la empresa');
        }       
        else
        {
          alert('Error en el servicio eliminar proyecto');
        }
      });
  }
}
