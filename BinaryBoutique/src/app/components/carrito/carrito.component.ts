import { Component, OnInit } from '@angular/core';
import { CartService } from '../../data/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: any[] = [];
  totalPrice: number = 0

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getItems().subscribe((items: any[]) => {
      console.log('Items en el carrito:', items);
      this.items = items;
      this.calcularTotal();
    });
  }

  calcularTotal(): void {
    this.totalPrice = this.items.reduce((total, item) => {
    const precioTotalPorProducto = (item.selectedQuantity || 0) * (item.valor || 0);
    return total + precioTotalPorProducto;
    }, 0);
  }

  // ... otros métodos
}
