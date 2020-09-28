import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ProyectoModel } from '../../../models/general/proyecto';
import { ProyectoService } from '../../../services/general/proyecto.service';
import { CrearProyectoComponent } from '../crear-proyecto/crear-proyecto.component';
import { EliminarProyectoComponent } from '../eliminar-proyecto/eliminar-proyecto.component';
import { ActualizarProyectoComponent } from '../actualizar-proyecto/actualizar-proyecto.component';
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {
  description = 'Proyectos';
  ELEMENT_DATA: ProyectoModel[];
  displayedColumns: string[] = ['id', 'name-proyect', 'description', 'price', 'actions'];
  dataSource = new MatTableDataSource<ProyectoModel>(this.ELEMENT_DATA);
  usuario: ProyectoModel;
  idUsuario: any;
  id: number;

  constructor(
    public proyectoService: ProyectoService,
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
    this.obtenerListaProyectos();
  }

  // tslint:disable-next-line: typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // tslint:disable-next-line: typedef
  obtenerListaProyectos(): void {
    debugger;
    this.proyectoService.obtenerProyectos().subscribe(res => {
      this.dataSource.data = res as ProyectoModel[];
    });
  }
  // tslint:disable-next-line: typedef
  abrirModalActualizar(proyecto) {
    console.log(proyecto);
    const dialogComponent = new MatDialogConfig();
    dialogComponent.autoFocus = true;
    // dialogComponent.disableClose = true;
    dialogComponent.data = { proyecto };
    const dialogRef = this.dialog.open(ActualizarProyectoComponent, dialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.obtenerListaProyectos();
      }
    });
  }
  // tslint:disable-next-line: typedef
  abrirModalEliminar(proyecto) {
    const dialogComponent = new MatDialogConfig();
    dialogComponent.autoFocus = true;
    dialogComponent.disableClose = true;
    dialogComponent.data = { proyecto };
    const dialogRef = this.dialog.open(EliminarProyectoComponent, dialogComponent);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.proyectoService.dataChange.value.findIndex(x => x.id === this.id);
        this.proyectoService.dataChange.value.splice(foundIndex, 1);

        this.obtenerListaProyectos();
      }
      this.obtenerListaProyectos();
    });
  }


  // tslint:disable-next-line: typedef
  crearProyecto() {
    const dialogComponent = new MatDialogConfig();
    dialogComponent.autoFocus = true;
    dialogComponent.disableClose = true;
    const dialogRef = this.dialog.open(CrearProyectoComponent, dialogComponent);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerListaProyectos();
        this.refreshTable();
      }
    });
  }
  // tslint:disable-next-line: typedef
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
