import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<number>(this.getCartCount());

  cartCount$ = this.cartSubject.asObservable();

  /**
   * Adds an item to the cart and updates local storage.
   */
  addToCart(item: any): void {
    const cart = this.getCart();
    this.cartSubject.next(cart.length); // Update the cart count
  }

  /**
   * Gets the cart items from local storage.
   */
  getCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  /**
   * Gets the current cart count.
   */
  getCartCount(): number {
    return this.getCart().length;
  }
}
