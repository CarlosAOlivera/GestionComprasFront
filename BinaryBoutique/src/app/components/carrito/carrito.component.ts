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

constructor(
  private cartService: CartService, 
  private cd: ChangeDetectorRef, 
  private dialog: MatDialog,
  private router: Router
) { }

  ngOnInit() {
    console.log(this.items);
    this.calculateTotalPrice();
    this.cartService.cartItems$.subscribe((items: any[]) => {
      console.log('Items before rendering:', items);
      console.log('Items en el carrito:', items);
      this.items = items;
      this.calculateTotalPrice();
      this.cd.detectChanges();
    });
  }

  updateQuantity(item: any, newQuantity: number): void {
    this.cartService.updateItemQuantity(item.product.idProducto, newQuantity);
  }                                                                                                                                                             

  removeItem(item: any): void {
    this.cartService.removeItem(item.product.idProducto);
  }

  calcularTotal(): void {
    this.totalPrice = this.items.reduce((total, item) => {
    const precioTotalPorProducto = (item.selectedQuantity || 0) * (item.valor || 0);
    return total + precioTotalPorProducto;
    }, 0);
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartService.calculateCartTotal();
  }

  proceedToCheckout(): void {
    //this.router.navigate(['/checkout']);
    
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      width: '1000px', 
      height: '700px',
      backdropClass: 'dialog-backdrop'
    });
  }

  saveForLater(item: any): void {
    this.cartService.saveItemsForLater(item.product.idProducto);
  }

  clearCart() {
    this.cartService.clearCart();
  }
  checkout() {
    alert('Compra realizada con éxito');
    this.cartService.clearCart();
  }

  trackByProductId(index: number, item: any): any {
  return item.product.idProducto;
}

  // ... otros métodos
}
