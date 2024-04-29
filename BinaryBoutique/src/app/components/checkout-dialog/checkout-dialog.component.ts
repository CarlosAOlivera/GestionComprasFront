import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Customer {
  fullName: string;
  phoneNumber: string;
  address: string;
}

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent {
  address: string = '';
  customer: Customer = {
    fullName: '',
    phoneNumber: '',
    address: ''
  };

  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmPurchase(): void {
    if (this.address && this.address.trim() !== '') {
      this.dialogRef.close({address: this.address});
    } else {
      alert('Por favor, ingrese una dirección válida');
      console.log('La dirección no puede estar vacía.')
    }
  }
}
