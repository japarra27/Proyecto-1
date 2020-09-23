import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DiseñoModel } from '../../../models/general/diseño';
import { DiseñoService } from '../../../services/general/diseño.service';
import { CrearDiseñoComponent } from '../../components/crear-diseño/crear-diseño.component';
import { ActualizarDiseñoComponent } from '../actualizar-diseño/actualizar-diseño.component';
import { EliminarDiseñoComponent } from '../eliminar-diseño/eliminar-diseño.component';
@Component({
  selector: 'app-diseño',
  templateUrl: './diseño.component.html',
  styleUrls: ['./diseño.component.scss']
})
export class DiseñoComponent implements OnInit {
  description = 'Diseños';
  ELEMENT_DATA: DiseñoModel[];
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email'];
  dataSource = new MatTableDataSource<DiseñoModel>(this.ELEMENT_DATA);
  usuario: DiseñoModel;
  serviceData: DiseñoService | null;
  idUsuario: any;
  id: number;

  constructor(
    public diseñoService: DiseñoService,
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'files',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/undraw_personal_file_222m.svg'),
    );
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerListaDiseños();
  }

  // tslint:disable-next-line: typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // tslint:disable-next-line: typedef
  obtenerListaDiseños(): void {
    this.diseñoService.obtenerDiseños().subscribe(res => {
      this.dataSource.data = res as DiseñoModel[];
    });
  }
  // tslint:disable-next-line: typedef
  abrirModalUpdate(diseño) {
    const dialogComponent = new MatDialogConfig();
    dialogComponent.autoFocus = true;
    // dialogComponent.disableClose = true;
    dialogComponent.data = { diseño };
    const dialogRef = this.dialog.open(ActualizarDiseñoComponent, dialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.obtenerListaDiseños();
      }
    });
  }
  // tslint:disable-next-line: typedef
  abrirModalDelete(diseño) {
    debugger
    const dialogComponent = new MatDialogConfig();
    dialogComponent.autoFocus = true;
    dialogComponent.disableClose = true;
    dialogComponent.data = { diseño };
    const dialogRef = this.dialog.open(EliminarDiseñoComponent, dialogComponent);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.diseñoService.dataChange.value.findIndex(x => x.id === this.id);
        this.diseñoService.dataChange.value.splice(foundIndex, 1);
        this.obtenerListaDiseños();
      }
    });
    this.obtenerListaDiseños();
  }

  // tslint:disable-next-line: typedef
  crearDiseno() {
    const dialogComponent = new MatDialogConfig();
    dialogComponent.autoFocus = true;
    dialogComponent.disableClose = true;
    const dialogRef = this.dialog.open(CrearDiseñoComponent, dialogComponent);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerListaDiseños();
        this.refreshTable();
      }
      this.obtenerListaDiseños();
      this.refreshTable();
    });
  }
  // tslint:disable-next-line: typedef
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
