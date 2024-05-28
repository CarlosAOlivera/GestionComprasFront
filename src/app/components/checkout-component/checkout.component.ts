import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutService: any = {};
  userInformation: any = {};
  cartDetails: any = {};
  shippingDetails: any = {};
  cartSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCart().subscribe(cartItems => {
      this.cartDetails = this.cartService.getCartDetails();
      this.calculateTotal();
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  openCheckoutDialog(): void {
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      width: '80%',
      data: {
        user: this.userInformation,
        cart: this.cartDetails,
        shipping: this.shippingDetails,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.finalizePurchase(result);
      }
    });
  }

  finalizePurchase(addressData: { address: any; }): void {
    const deliveryAddress = addressData.address;
    this.cartService.completeOrder(addressData).subscribe({
      next: (response: any) => {
        this.snackBar.open('¡Compra realizada con éxito!', 'Cerrar', {
          duration: 3000,
        });

        this.cartService.clearCart();

        this.router.navigate(['/thanks']);
      },
      error: (error: any) => {
        this.snackBar.open('¡Error al procesar la compra!', 'Cerrar', {
          duration: 3000,
        });
        console.error('Error processing order:', error);
      }
    });
  }

  private calculateTotal(): void {
    this.cartDetails = this.cartService.getCartDetails();
  }
}
