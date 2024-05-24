import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../enviroments/environment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent implements OnInit {
  orderSummary: any;
  customerForm: FormGroup;
  userEmail: string = '';

  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private authService: AuthService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.orderSummary = {
      subtotal: data.subtotal || 0,
      tax: data.tax || 0,
      deliveryCost: data.deliveryCost || 0,
      total: data.total || 0
    };
    console.log('Datos recibidos en el diálogo:', this.orderSummary);
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      deliveryInfo: ['']
    });
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarioEmail().subscribe(email => {
      this.userEmail = email;
    });
  }

  confirmPurchase(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      const cartItems = this.cartService.getCartItems(); // Obtén los ítems del carrito
      const orderData = {
        ...customerData,
        ...this.orderSummary,
        email: 'usuario@example.com', // Aquí se debe obtener el email del usuario autenticado
        customerName: `${customerData.firstName} ${customerData.lastName}`,
        ordenItems: cartItems.map(item => ({
          productName: item.product.nombre,
          quantity: item.selectedQuantity,
          price: item.product.valor
        }))
      };
  
      this.http.post(`${environment.apiUrl}/api/v1/Orden/complete-order`, orderData).subscribe(
        (response: any) => {
          alert('¡Compra confirmada! Recibirás un email de confirmación.');
          this.dialogRef.close(this.customerForm.value);
        },
        (error) => {
          alert('Error al confirmar la compra. Por favor, intenta de nuevo.');
          console.error(error);
        }
      );
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
