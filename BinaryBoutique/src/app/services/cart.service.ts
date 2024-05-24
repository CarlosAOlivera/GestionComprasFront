import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCart: any[] = [];
  private itemsInCartSubject = new BehaviorSubject<any[]>(this.itemsInCart);
  private itemsSavedForLater: any[] = [];
  private itemsSavedForLaterSubject = new BehaviorSubject<any[]>(this.itemsSavedForLater);
  private itemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public items$: Observable<any[]> = this.itemsSubject.asObservable();
  private items: any[] = [];


  constructor(private http: HttpClient) {}

  getCart(): Observable<any[]> {
    return this.itemsInCartSubject.asObservable();
  }

  getCartItems(): any[] {
    return this.itemsSubject.getValue();
  }

  addItem(item: any): void {
    const items = this.itemsSubject.getValue();
    items.push(item);
    this.itemsSubject.next(items);
  }

  getCartDetails(): any {
    let subtotal = 0;
    let iva = 0;
    let envio = 0;
    const taxRate = 0.14; // Ajusta el valor según tu IVA
    const shippingRate = 15.00; // Ajusta el valor del envío

    this.itemsInCart.forEach(item => {
      subtotal += item.product.precio * item.selectedQuantity;
    });

    iva = subtotal * taxRate;
    envio = subtotal > 0 ? shippingRate : 0; // Aplica la tarifa de envío solo si hay artículos en el carrito

    return {
      subtotal: subtotal,
      iva: iva,
      envio: envio,
      total: subtotal + iva + envio
    };
  }

  addToCart(product: any, selectedQuantity: number): void {
    const existingItemIndex = this.itemsInCart.findIndex(item => item.product.idProducto === product.idProducto);
    const quantity = selectedQuantity;
    if (existingItemIndex !== -1) {
      this.itemsInCart[existingItemIndex].selectedQuantity += quantity;
    } else {
      this.itemsInCart.push({ product, selectedQuantity: quantity });
    }
    this.updateCartItems([...this.itemsInCart]);
    console.log('CartService: Product added', this.itemsInCart);
  }

  private updateCartItems(newItems: any[]): void {
    this.itemsInCartSubject.next(newItems);
  }

  updateItemQuantity(productId: string, newQuantity: number): void {
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

  saveItemsForLater(productId: string): void {
    const index = this.itemsInCart.findIndex(item => item.product.idProducto === productId);
    if (index !== -1) {
      const item = this.itemsInCart[index];
      this.itemsInCart.splice(index, 1);
      this.itemsSavedForLater.push(item);
      this.updateCartItems([...this.itemsInCart]);
      this.updateSavedItems([...this.itemsSavedForLater]);
    }
  }

  getItemsSavedForLater(): Observable<any[]> {
    return this.itemsSavedForLaterSubject.asObservable();
  }

  private updateSavedItems(newItems: any[]): void {
    this.itemsSavedForLaterSubject.next(newItems);
  }

  clearCart(): void {
    this.itemsInCart = [];
    this.updateCartItems([...this.itemsInCart]);
  }

  completeOrder(addressData: any): Observable<any> {
    return this.http.post('http://localhost:5101/api/v1/Orden/complete-order', addressData);
  }
}
