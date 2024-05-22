import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SearchService } from '../../services/search.service';
import { Product } from '../../data/product.model';
import { LoginUsuarioComponent } from '../usuario/login-usuario/login-usuario.component';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit{
  isLoggedIn: boolean = false;
  username: string | null = null;
  searchQuery: string = '';
  products: Product[] = [];
  navbarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService,
    private dialog: MatDialog, 
    private location: Location
  ){
    console.log('MenuComponent: costructor');
  }
  
  ngOnInit() {
    this.checkAuthStatus();
    console.log('MenuComponent: ngOnInit');
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

  shouldDisplayNavbar(): boolean {
    const excludedRoutes = ['../usuario/guardar-usuario'];
    const currentRoute = this.router.url;
    const display = !excludedRoutes.includes(currentRoute);
    console.log(`shouldDisplayNavbar: ${display}`);
    return display;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    if (this.searchQuery.trim() === '') {
      this.location.back();
    } else {
      this.searchService.search(this.searchQuery).subscribe(
        products => {
          this.products = products
          if (this.router.url !== '/search-results') {
            this.router.navigate(['/search-results'], { queryParams: { q: this.searchQuery } });
          }
        },
        error => console.error('Error al buscar productos', error)
      );
    }  
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim() === '') {
      this.location.back();
    } else {
      this.buscarProducto(this.searchQuery);
    }
  }

  buscarProducto(query: string): void {
    console.log('Buscando:', query);
    this.searchQuery = query;
    this.onSearch(this.searchQuery);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
    this.username = null;
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginUsuarioComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: { name: 'Login' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checkAuthStatus();
      console.log('The dialog was closed');
    });
  }
}