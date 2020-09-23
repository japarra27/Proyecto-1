import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//#region Componentes
import { HomeComponent } from './general/components/home/home.component';

import { AuthService } from './services/general/auth.service';
import { LoginComponent } from './general/components/login/login.component';
import { ProyectoComponent } from './general/components/proyecto/proyecto.component';
import { DiseñoComponent } from './general/components/diseños/diseño.component';
import { CrearProyectoComponent } from './general/components/crear-proyecto/crear-proyecto.component';
import { CrearDiseñoComponent } from './general/components/crear-diseño/crear-diseño.component';

//#endregion Componentes

const routes: Routes = [
  {
    path: 'proyecto',
    component: ProyectoComponent
  },
  {
    path: 'disenio',
    component: DiseñoComponent
  },
  {
    path: 'crear-disenio',
    component: CrearDiseñoComponent
  },

  {
    path: 'crear-proyecto',
    component: CrearProyectoComponent
  },


  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule {}
