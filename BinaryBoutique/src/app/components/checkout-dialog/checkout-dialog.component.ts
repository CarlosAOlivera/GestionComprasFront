import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../data/Cliente';


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
  }
  

  constructor(public dialogRef: MatDialogRef<CheckoutDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmPurchase(): void {
    if (this.customer.address.street.trim() && this.customer.fullName.trim()) {
      this.dialogRef.close(this.customer);
    } else {
      alert('Por favor, ingrese una dirección válida');
      console.log('La dirección no puede estar vacía.')
    }
  }
}