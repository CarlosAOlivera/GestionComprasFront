import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router){
    console.log('MenuComponent: costructor');
  }

  ngOnInit() {
    console.log('MenuComponent: ngOnInit');
  }

  shouldDisplayNavbar(): boolean {
    const excludedRoutes = ['/login-comprador', '/guardar-comprador'];
    const currentRoute = this.router.url;
    const display = !excludedRoutes.includes(currentRoute);
    console.log(`shouldDisplayNavbar: ${display}`);
    return display;
  }
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  /*    logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
}*/
}
