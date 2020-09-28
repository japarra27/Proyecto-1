import { Component, OnInit, Inject, ViewChild, Host } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { DiseñoService } from '../../../services/general/diseño.service';
import { DiseñoModel } from '../../../models/general/diseño';
// import { MatTableComponent } from '../mat-table/mat-table.component';

@Component({
  selector: 'app-actualizar-diseño',
  templateUrl: './actualizar-diseño.component.html',
  styleUrls: ['./actualizar-diseño.component.scss'],
})
export class ActualizarDiseñoComponent implements OnInit {
  description = 'Actualizar Informacíon';
  formActualizar: FormGroup;
  enviar: any;
  diseñoSeleccionado: DiseñoModel;
  constructor(
    public diseñoService: DiseñoService,
    private _builders: FormBuilder,
    public dialogRef: MatDialogRef<ActualizarDiseñoComponent>,
    @Inject(MAT_DIALOG_DATA) private dataSource: any
  ) {
    this.diseñoSeleccionado = this.dataSource.diseño;
    console.log('diseño Seleccinado', this.diseñoSeleccionado);
    this.updateFormGroup();
    this.cargarData();
  }
  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  cargarData(){
    this.formActualizar.patchValue({
      id: this.diseñoSeleccionado.id,
      name : this.diseñoSeleccionado.designer_first_name,
      lastName: this.diseñoSeleccionado.designer_last_name,
      email: this.diseñoSeleccionado.designer_email
    });
  }

  // tslint:disable-next-line: typedef
  actualizarUsuario() {
    this.enviar = this.formActualizar.value;
    this.diseñoService
      .modificarDiseño(this.enviar)
      .subscribe((res) => {
        // this.diseñoSeleccionado = res;
      });
    this.cerrar();
  }
  // tslint:disable-next-line: typedef
  updateSubmit(){
    if ( this.formActualizar.invalid ){
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
      lastName: ['',
        Validators.required,
      ],
      email: ['',
        [Validators.email, Validators.required],
      ],
    });
  }

  // tslint:disable-next-line: typedef
  cerrar() {
    this.dialogRef.close(this.formActualizar.value);
    this.formActualizar.reset();
  }

}
