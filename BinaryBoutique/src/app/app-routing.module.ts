import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardarUsuarioComponent } from './components/usuario/guardar-usuario/guardar-usuario.component';
import { LoginUsuarioComponent } from '../app/components/usuario/login-usuario/login-usuario.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MujerComponent } from './components/mujer/mujer.component';
import { HombreComponent } from './components/hombre/hombre.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  { path: 'guardar-usuario', component: GuardarUsuarioComponent },
  { path: 'login-usuario', component: LoginUsuarioComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'productos', component: ProductosComponent},
  { path: 'mujer', component: MujerComponent },
  { path: 'hombre', component: HombreComponent},
  { path: 'carrito', component: CarritoComponent},
  { path: 'search-results', component: SearchResultsComponent },
  { path: '', component: HomePageComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }