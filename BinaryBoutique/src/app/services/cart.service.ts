import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getTotal() {
    throw new Error('Method not implemented.');
  }
  private itemsInCartSubject = new BehaviorSubject<any[]>([]);
  public cartItems$ = this.itemsInCartSubject.asObservable();
  private itemsInCart: any[] = [];
  private itemsSavedForLater: any[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  addToCart(product: any, selectedQuantity: number) {
    const existingItemIndex = this.itemsInCart.findIndex(item => item.product.idProducto === product.idProducto);
    const quantity = selectedQuantity;
      if (existingItemIndex !== -1) {
        this.itemsInCart[existingItemIndex].selectedQuantity += quantity;
      } else {
        this.itemsInCart.push({ product, selectedQuantity: quantity });
      }
      this.updateCartItems([...this.itemsInCart]);
      console.log('CartService: Product added', this.itemsInCart);
      this.calculateCartTotal();
  }

  private updateCartItems(newItems: any[]): void {
    this.itemsInCartSubject.next(newItems);
  }

  updateItemQuantity(productId: string, newQuantity: number):void {
    const index = this.itemsInCart.findIndex(item => item.product.idProducto === productId);
    if (index !== -1) {
      if (newQuantity > 0) {
        this.itemsInCart[index].selectedQuantity = newQuantity;
      } else {
        this.removeItem(productId);
      }
      this.updateCartItems([...this.itemsInCart]);
    }
  }

  removeItem(productId: string): void {
    this.itemsInCart = this.itemsInCart.filter(item => item.product.idProducto !== productId);
    this.updateCartItems([...this.itemsInCart]);
  }

  calculateCartTotal() {
    return this.itemsInCart.reduce((total, currentItem) => {
      const itemTotal = (currentItem.selectedQuantity * (currentItem.product.valor || 0));
      return total + itemTotal;
    }, 0);
  }

  getItems() {
    return this.itemsInCartSubject.asObservable();
  }

  clearCart(){
    this.itemsInCart = [];
    this.itemsInCartSubject.next(this.itemsInCart);
    console.log('CartService: Cart cleared');
  }

  saveItemsForLater(prosductId: string): void {
    const index = this.itemsInCart.findIndex(item => item.product.idProducto === prosductId);
    if (index !== -1) {
      const item = this.itemsInCart[index];
      this.itemsInCart.splice(index, 1);
      this.itemsSavedForLater.push(item);
      this.updateCartItems([...this.itemsInCart]);
    }
  }

  getItemsSavedForLater(): any[] {
    return this.itemsSavedForLater;
  }
  
}

function getItems() {
    throw new Error('Function not implemented.');
  }
