import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  /*ngOnInit() {
    this.productosServices.obtenerProductosMasBuscados().subscribe({
      next: (productos) => {
        this.productosMasBuscados = productos;
      },
      error: (error) => {
        console.error('Error al obtener productos más buscados', error);
      }
    });
  }*/
}
