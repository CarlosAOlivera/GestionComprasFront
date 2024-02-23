import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardarCompradorComponent } from '../app/components/comprador/guardar-comprador/guardar-comprador.component';
import { LoginCompradorComponent } from '../app/components/comprador/login-comprador/login-comprador.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: 'guardar-comprador', component: GuardarCompradorComponent },
  { path: 'login-comprador', component: LoginCompradorComponent },
  { path: '', component: HomePageComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
