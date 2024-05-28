import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:5101/api/';

  constructor(private http: HttpClient, private cartService: CartService) { }
  
  completeOrder(addressData: any): Observable<any> {
    const orderDetails = {
      address: addressData.address,
      cartItems: this.cartService.getItems(),
      total: this.cartService.getTotal()
  };
    return this.http.post(`${this.apiUrl}/orders`, orderDetails);
  }
  
  finalizePurchase() {
    this.cartService.clearCart();
  }
}
