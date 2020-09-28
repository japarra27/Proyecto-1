import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';

//#region modules
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from '../app/general/material/material.module';

//#endregion

//#region components
import { MainComponent } from './general/components/main/main.component';
import { HomeComponent } from './general/components/home/home.component';
import { LoginComponent } from './general/components/login/login.component';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { from } from 'rxjs';
import { ProyectoComponent } from './general/components/proyecto/proyecto.component';
import { CrearProyectoComponent } from './general/components/crear-proyecto/crear-proyecto.component';
import { DiseñoComponent } from './general/components/diseños/diseño.component';
import { CrearDiseñoComponent } from './general/components/crear-diseño/crear-diseño.component';
import { ProyectoService } from './services/general/proyecto.service';
import { DiseñoService } from './services/general/diseño.service';
import { EliminarProyectoComponent } from './general/components/eliminar-proyecto/eliminar-proyecto.component';
import { ActualizarProyectoComponent } from './general/components/actualizar-proyecto/actualizar-proyecto.component';
import { ActualizarDiseñoComponent } from './general/components/actualizar-diseño/actualizar-diseño.component';
import { EliminarDiseñoComponent } from './general/components/eliminar-diseño/eliminar-diseño.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';


//#region

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    ProyectoComponent,
    CrearProyectoComponent,
    DiseñoComponent,
    CrearDiseñoComponent,
    EliminarProyectoComponent,
    ActualizarProyectoComponent,
    ActualizarDiseñoComponent,
    EliminarDiseñoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FormsModule,
    MaterialFileInputModule,


    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AppRoutingModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    ProyectoService,
    DiseñoService,
    MaterialModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
