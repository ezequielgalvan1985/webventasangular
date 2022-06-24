import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaFormComponent } from './componentes/categoria-form/categoria-form.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { LoginComponent } from './auth/login.component';

import { PruebaComponent } from './componentes/prueba/prueba.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'prueba', component: PruebaComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categorias', component: CategoriaComponent,canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'categorias/add', component: CategoriaFormComponent },
  { path: 'categorias/edit/:id', component: CategoriaFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
