import { Component, OnInit } from '@angular/core';
import { CartService } from '../../data/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getItems().subscribe((items: any[]) => {
      console.log('Items en el carrito:', items);
      this.items = items
    });
  }

  // ... otros métodos
}
