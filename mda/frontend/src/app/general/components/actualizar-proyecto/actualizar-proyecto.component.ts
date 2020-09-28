import { Component, OnInit, Inject, ViewChild, Host } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProyectoModel } from 'src/app/models/general/proyecto';
import { ProyectoService } from '../../../services/general/proyecto.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-proyecto',
  templateUrl: './actualizar-proyecto.component.html',
  styleUrls: ['./actualizar-proyecto.component.scss'],
})
export class ActualizarProyectoComponent implements OnInit {
  description = 'Actualizar Informacíon';
  formActualizar: FormGroup;
  enviar: any;
  proyectoSeleccionado: ProyectoModel;
  constructor(
    public proyectoService: ProyectoService,
    private _builders: FormBuilder,
    public dialogRef: MatDialogRef<ActualizarProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) private dataSource: any
  ) {
    this.proyectoSeleccionado = this.dataSource.proyecto;
    console.log(this.proyectoSeleccionado);
    this.updateFormGroup();
    this.cargarData();
  }
  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  cargarData() {
    this.formActualizar.patchValue({
      id: this.proyectoSeleccionado.id,
      name: this.proyectoSeleccionado.project_name,
      descripccion: this.proyectoSeleccionado.project_description,
      precio: this.proyectoSeleccionado.project_price
    });
  }

  // tslint:disable-next-line: typedef
  actualizarUsuario() {
    this.enviar = this.formActualizar.value;
    this.proyectoService
      .modificarProyecto(this.enviar)
      .subscribe((res) => {
        debugger;
        // this.usuarioSeleccionado = res;
      }, (error: HttpErrorResponse) => {
        console.error('error servicio' + error);
        console.log('mesaje error:' + error.message);
        if (error.message.includes('404')) {
          alert('Error en el servicio editar proyecto, no se puede editar ya que no pertenece a la empresa');
        }       
        else
        {
          alert('Error en el servicio editar proyecto');
        }
      });
    this.cerrar();
  }
  // tslint:disable-next-line: typedef
  updateSubmit() {
    if (this.formActualizar.invalid) {
      return Object.values(this.formActualizar.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
  }

  // tslint:disable-next-line: typedef
  updateFormGroup() {
    this.formActualizar = this._builders.group({
      id: [''],
      name: ['',
        Validators.required,
      ],
      descripccion: ['',
        Validators.required,
      ],
      precio: ['',
        [Validators.required, Validators.pattern('[0-9]*')],
      ],
    });
  }

  // tslint:disable-next-line: typedef
  cerrar() {
    this.dialogRef.close(this.formActualizar.value);
    this.formActualizar.reset();
  }

}
