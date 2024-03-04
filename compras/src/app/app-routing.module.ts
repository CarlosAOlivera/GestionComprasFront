import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardarUsuarioComponent } from './components/usuario/guardar-usuario/guardar-usuario.component';
import { LoginUsuarioComponent } from '../app/components/usuario/login-usuario/login-usuario.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  { path: 'guardar-usuario', component: GuardarUsuarioComponent },
  { path: 'login-usuario', component: LoginUsuarioComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'productos', component: ProductosComponent},
  { path: '', component: HomePageComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
