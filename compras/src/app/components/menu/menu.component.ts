import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SearchService } from '../../data/search.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  searchQuery: string = '';

  constructor(
    private router: Router,
    private searchService: SearchService
  ){
    console.log('MenuComponent: costructor');
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.searchService.searchProducts(this.searchQuery).subscribe({
        next: (result) => {
          // Ahora pasamos los resultados de búsqueda usando el estado del router
          this.router.navigate(['/search-results'], { state: { searchResults: result } });
        },
        error: (error) => {
          console.error('Error al buscar productos', error);
        }
      });
    }
  }
  

  ngOnInit() {
    console.log('MenuComponent: ngOnInit');
  }

  shouldDisplayNavbar(): boolean {
    const excludedRoutes = ['/login-usuario', '/guardar-usuario'];
    const currentRoute = this.router.url;
    const display = !excludedRoutes.includes(currentRoute);
    console.log(`shouldDisplayNavbar: ${display}`);
    return display;
  }
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  buscarProducto(query: string): void {
    console.log('Buscando:', query);
    this.router.navigate(['/search-results'], { queryParams: { q: query } });
  }

  /*    logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
}*/
}
