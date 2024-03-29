import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardarUsuarioComponent } from './components/usuario/guardar-usuario/guardar-usuario.component';
import { LoginUsuarioComponent } from './components/usuario/login-usuario/login-usuario.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthInterceptor } from './data/authInterceptor';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HombreComponent } from './components/hombre/hombre.component';
import { MujerComponent } from './components/mujer/mujer.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductDetailDialogComponent } from './components/product-detail-dialog/product-detail-dialog.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { GeneroComponent } from './components/genero/genero.component';

@NgModule({
  declarations: [
    AppComponent,
    GuardarUsuarioComponent,
    LoginUsuarioComponent,
    MenuComponent,
    HomePageComponent,
    AdminDashboardComponent,
    HombreComponent,
    MujerComponent,
    CarritoComponent,
    ProductosComponent,
    ProductDetailDialogComponent,
    SearchResultsComponent,
    FooterComponent,
    GeneroComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,    
    FormsModule,    
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,

    ToastrModule.forRoot({
      timeOut: 3000, 
      positionClass: 'toast-bottom-right', 
      preventDuplicates: true, 
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]


})
export class AppModule { }
