import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CartService } from '../../data/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrl: './product-detail-dialog.component.css'
})
export class ProductDetailDialogComponent {
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

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.dialogRef.close();
    this.toastr.success('Producto añadido al carrito:', product);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
