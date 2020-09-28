import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ProyectoService } from '../../../services/general/proyecto.service';
import { ProyectoModel } from '../../../models/general/proyecto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss'],
})
export class CrearProyectoComponent implements OnInit {
  formProyect: FormGroup;
  enviar: any;
  proyectModel: ProyectoModel;
  description = 'Crear Proyecto';
  constructor(
    private _builders: FormBuilder,
    private proyectoService: ProyectoService,
    public dialogRef: MatDialogRef<CrearProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public proyect: ProyectoModel,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.agregarFormGroup();
  }
  // tslint:disable-next-line: typedef
  getErrorMessage() {
    return this.formProyect.hasError('required') ? 'Required field' :
      this.formProyect.hasError('email') ? 'Not a valid email' :
        '';
  }

  // tslint:disable-next-line: typedef
  crearNuevoProyecto() {
    this.proyectModel = this.formProyect.value;
    this.proyectoService.crearProyecto(this.proyectModel).subscribe((res) => {
      this.proyectModel = res;
    });
    this.cerrar();
    this._snackBar.open('Operación Exitosa', 'Undo', {
      duration: 3000,
    });
  }
  // tslint:disable-next-line: typedef
  agregarSubmit() {
    if (this.formProyect.invalid) {
      return Object.values(this.formProyect.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
  }

  // tslint:disable-next-line: typedef
  agregarFormGroup() {
    this.formProyect = this._builders.group({
      nameProyect: this._builders.control('', [Validators.required]),
      descriptionProyect: this._builders.control('', [Validators.required]),
      price: this._builders.control('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.proyectoService.crearProyecto(this.proyect);
  }
  // tslint:disable-next-line: typedef
  cerrar() {
    this.dialogRef.close(this.formProyect.value);
    this.formProyect.reset();
  }
}
