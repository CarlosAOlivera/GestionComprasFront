import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../enviroments/environment';
import { CartService } from '../../services/cart.service';
import { Orden, OrdenItem } from '../../models/orden.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent implements OnInit {
  orderSummary: any;
  customerForm: FormGroup;
  userEmail: string = '';
  cartItems: any[] = []; 
  

  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
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
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      deliveryInfo: ['']
    });
  }

  ngOnInit(): void {
    console.log('Token:', localStorage.getItem('token'));

    this.userEmail = localStorage.getItem('email') || '';

    this.customerForm.patchValue({
      email: this.userEmail
    });

    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      console.log('Ítems del carrito:', this.cartItems);
    });

    this.authService.isLoggedIn();
    }


  confirmPurchase(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;

      // Verifica que el array de ordenItems no esté vacío
      if (this.cartItems.length === 0) {
        alert('El carrito está vacío. Por favor, añade productos antes de confirmar la compra.');
        return;
      }

      const orderData: Orden = {
        customerFirstName: customerData.firstName,
        customerLastName: customerData.lastName,
        customerEmail: customerData.email,  
        
        street: customerData.street,
        city: customerData.city,
        state: customerData.state,
        zipCode: customerData.zipCode,
        phone: customerData.phone,
        deliveryInfo: customerData.deliveryInfo,

        ordenItems: this.cartItems.map((item: any) => ({
          productName: item.product.nombre,
          quantity: item.selectedQuantity,
          price: item.product.valor
        })),

        subtotal: this.orderSummary.subtotal,
        tax: this.orderSummary.tax,
        deliveryCost: this.orderSummary.deliveryCost,
        total: this.orderSummary.total,
        
      };
  
      this.http.post(`${environment.apiUrl}/api/v1/Orden/complete-order`, orderData).subscribe(
        (response: any) => {
          alert('¡Compra confirmada! Recibirás un email de confirmación.');
          this.cartService.clearCart();
          this.dialogRef.close(this.customerForm.value);
          this.router.navigate(['/']);
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
