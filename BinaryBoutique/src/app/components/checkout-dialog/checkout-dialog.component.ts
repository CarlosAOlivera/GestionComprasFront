import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent implements OnInit {
  orderSummary: { subtotal: number, iva: number, envio: number, total: number } = { subtotal: 0, iva: 0, envio: 0, total: 0 };
  customerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
    this.customerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      additionalInfo: ['']
    });
  }

  ngOnInit(): void {
    this.calculateOrderSummary();
  }

  calculateOrderSummary(): void {
    this.orderSummary = this.cartService.getCartDetails();
  }

  confirmPurchase(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      this.cartService.clearCart();
      alert('¡Compra confirmada! Recibirás un email de confirmación.');
      this.dialogRef.close(this.customerForm.value);
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelPurchase(): void {
    this.dialogRef.close();
  }
}
