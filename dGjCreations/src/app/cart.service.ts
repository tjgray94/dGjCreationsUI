import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { name: string; price: number; quantity: number }[] = [];
  private totalAmountSource = new BehaviorSubject<number>(0);
  public totalAmount$ = this.totalAmountSource.asObservable();

  constructor() { }

  public addToCart(name: string, price: number, quantity: number = 1): void {
    this.cartItems.push({ name, price, quantity });
  }

  public removeFromCart(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
    }
  }

  public getCartItems(): { name: string; price: number; quantity: number }[] {
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