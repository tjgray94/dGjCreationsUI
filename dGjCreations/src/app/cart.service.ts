import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { name: string; price: number; quantity: number; purchaseQuantity: number }[] = [];
  private totalAmountSource = new BehaviorSubject<number>(0);
  public totalAmount$ = this.totalAmountSource.asObservable();

  constructor() { }

  public addToCart(product: Product, purchaseQuantity: number = 1): void {
    this.cartItems.push({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      purchaseQuantity: Math.min(purchaseQuantity, product.quantity)
    });
  }

  public removeFromCart(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
    }
  }

  public getCartItems(): { name: string; price: number; quantity: number; purchaseQuantity: number }[] {
    return this.cartItems;
  }

  public getCartItemNames(): string[] {
    return this.cartItems.map(item => item.name);
  }

  public clearCart(): void {
    this.cartItems = [];
  }

  public setTotalAmount(totalAmount: number): void {
    this.totalAmountSource.next(totalAmount);
  }
}