import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrl: './product-detail-dialog.component.css'
})
export class ProductDetailDialogComponent { 
  quantity: number = 1;
  addToWishlist(product: any): void {
    console.log('Producto añadido a la lista de deseos', product);
    throw new Error('Method not implemented.');
}

  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  addToCart(product: any, quantity: number): void {
    if (quantity > 0 && quantity <= product.cantidad){
      console.log('Producto seleccionado:', product);
      console.log('Cantidad seleccionada:', quantity );
      this.cartService.addToCart(product, quantity);
      this.dialogRef.close();
      this.toastr.success('Producto añadido al carrito:', product);
    } else {
      this.toastr.error('Cantidad no válida');
    }
    
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
