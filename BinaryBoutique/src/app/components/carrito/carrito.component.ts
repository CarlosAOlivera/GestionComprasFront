import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: any[] = [];
  totalPrice: number = 0;
  tax: number = 0;
  deliveryCost: number = 5.00; // Assuming a flat delivery cost
  totalWithTaxAndDelivery: number = 0;
  taxRate: number = 0.115; // Assuming a 11% tax rate

constructor(
  private cartService: CartService, 
  private cd: ChangeDetectorRef, 
  private dialog: MatDialog,
  private router: Router
) { }

  ngOnInit() {
    this.cartService.getCart().subscribe((items: any[]) => {
      console.log('Items before rendering:', items);
      console.log('Items en el carrito:', items);
      this.items = items;
      this.calculateTotalPrice();
      this.cd.detectChanges();
    });
  }

  updateQuantity(item: any, newQuantity: number): void {
    this.cartService.updateItemQuantity(item.product.idProducto, newQuantity);
    this.calculateTotalPrice();
  }                                                                                                                                                             

  removeItem(item: any): void {
    this.cartService.removeItem(item.product.idProducto);
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.items.reduce((total, item) => {
      const precioTotalPorProducto = (item.selectedQuantity || 0) * (item.product.valor || 0);
      return total + precioTotalPorProducto;
    }, 0);

    this.tax = this.totalPrice * this.taxRate;
    this.totalWithTaxAndDelivery = this.totalPrice + this.tax + this.deliveryCost;
  }

  proceedToCheckout(): void {  
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      width: '1000px', 
      height: '700px',
      backdropClass: 'dialog-backdrop',
      data: {
        subtotal: this.totalPrice,
        tax: this.tax,
        deliveryCost: this.deliveryCost,
        total: this.totalWithTaxAndDelivery
      }
    });
  }

  saveForLater(item: any): void {
    this.cartService.saveItemsForLater(item.product.idProducto);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.items = [];
    this.calculateTotalPrice();
  }

  checkout(): void {
    alert('Compra realizada con éxito');
    this.cartService.clearCart();
    this.items = [];
    this.calculateTotalPrice();
  }

  trackByProductId(index: number, item: any): any {
  return item.product.idProducto;
}

  // ... otros métodos
}
