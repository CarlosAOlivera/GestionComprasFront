import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private itemsInCart: any[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  addToCart(product: any) {
    this.itemsInCart.push(product);
    this.itemsInCartSubject.next(this.itemsInCart);
    console.log('CartService: Product added', this.itemsInCart);
  }

  getItems() {
    return this.itemsInCartSubject.asObservable();
  }

  clearCart(){
    this.itemsInCart = [];
    this.itemsInCartSubject.next(this.itemsInCart);
    console.log('CartService: Cart cleared');
  }
}