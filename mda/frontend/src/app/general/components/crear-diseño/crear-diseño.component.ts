import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { DiseñoModel } from '../../../models/general/diseño';
import { DiseñoService } from '../../../services/general/diseño.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { element } from 'protractor';

@Component({
  selector: 'app-crear-diseño',
  templateUrl: './crear-diseño.component.html',
  styleUrls: ['./crear-diseño.component.scss'],
})
export class CrearDiseñoComponent implements OnInit {
  formDisenio: FormGroup;
  enviar: any;
  diseñoModel: any;
  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string;

  description = 'Crear Diseño';
  cargaArchivo: any;
  constructor(
    private _builders: FormBuilder,
    private diseñoService: DiseñoService,
    public dialogRef: MatDialogRef<CrearDiseñoComponent>,
    @Inject(MAT_DIALOG_DATA) public diseño: DiseñoModel,
    public dataService: DiseñoService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.agregarFormGroup();
  }
  // tslint:disable-next-line: typedef
  getErrorMessage() {
    return this.formDisenio.hasError('required') ? 'Required field' :
      this.formDisenio.hasError('email') ? 'Not a valid email' :
        '';
  }
  // tslint:disable-next-line: typedef
  crearNuevoDisenio() {
    this.diseñoModel = this.formDisenio.value;
    debugger
    this.diseñoModel.file._files.forEach((element) => {
      if (element.type == 'image/jpeg' || element.type == 'image/png') {
        this.cargaArchivo = element;
        this.diseñoService.crearDiseño(this.diseñoModel, this.cargaArchivo).subscribe((res) => {
          this.diseñoModel = res;
        });
        this.cerrar();
        this._snackBar.open('Operación Exitosa', 'Undo', {
          duration: 3000,
        });
      } else {
        this._snackBar.open(
          'Porfavor seleccione un archivo  de tipo png o jpg',
          '',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['blue-snackbar'],
          }
        );
      }
    });
  }
  // tslint:disable-next-line: typedef
  agregarSubmit() {
    if (this.formDisenio.invalid) {
      return Object.values(this.formDisenio.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
  }

  // tslint:disable-next-line: typedef
  agregarFormGroup() {
    this.formDisenio = this._builders.group({
      name: this._builders.control('', [Validators.required]),
      lastName: this._builders.control('', [Validators.required]),
      email: this._builders.control('', [
        Validators.required,
        Validators.email,
      ]),

      price: this._builders.control('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      file: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  public confirmAdd(): void {
    this.dataService.crearDiseño(this.diseño, this.diseñoModel.file);
  }
  // tslint:disable-next-line: typedef
  cerrar() {
    this.dialogRef.close(this.formDisenio.value);
    this.formDisenio.reset();
  }
}
