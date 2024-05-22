import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../data/Cliente';
import { CheckoutService } from '../../services/checkout.service'

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent {
  cartItems: any[] = []; 
  vat: number = 0;
  shipping: number = 0;
  total: number = 0;

  customer: Customer = {
    fullName: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    }
  };

  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogComponent>,
    private checkoutService: CheckoutService  // Inyectar el servicio de checkout
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmPurchase(): void {
    if (this.customer.address.street.trim() && this.customer.fullName.trim()) {
      this.checkoutService.completeOrder(this.customer)
        .subscribe({
          next: (response) => {
            this.checkoutService.finalizePurchase(); // Limpia el carrito después de confirmar la orden
            alert('¡Compra confirmada! Recibirás un email de confirmación.');
            this.dialogRef.close(this.customer);
          },
          error: (error) => {
            alert('Hubo un error al confirmar la compra.');
            console.error('Error al confirmar la compra:', error);
          }
        });
    } else {
      alert('Por favor, ingrese una dirección válida');
      console.log('La dirección no puede estar vacía.');
    }
  }
}