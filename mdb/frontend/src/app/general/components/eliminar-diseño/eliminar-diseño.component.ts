import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiseñoService } from '../../../services/general/diseño.service';

@Component({
  selector: 'app-eliminar-diseño',
  templateUrl: './eliminar-diseño.component.html',
  styleUrls: ['./eliminar-diseño.component.scss'],
})
export class EliminarDiseñoComponent implements OnInit {
  form: FormGroup;
  titulo = 'Eliminar Diseño';
  disenioSeleccionado: any;
  constructor(
    public diseñoService: DiseñoService,
    public dialogRef: MatDialogRef<EliminarDiseñoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataSource: any
  ) {
    this.disenioSeleccionado = this.dataSource.diseño;
    console.log(this.disenioSeleccionado);
  }

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  borrarDisenio() {
    debugger
    this.diseñoService
      .eliminarDiseño(this.disenioSeleccionado.id)
      .subscribe((res) => {});
  }
}
