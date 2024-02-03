import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { BadgeService } from '../badge.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartItems = [];
  public totalAmount: number = 0;
  public itemTotal: number;
  public shippingTax = 10;
  public displayedColumns: string[] = ['name', 'quantity', 'price', 'action'];

  constructor(private cartService: CartService,
              private badgeService: BadgeService,
              private router: Router) {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  ngOnInit(): void {
  }

  public calculateTotal(): void {
    this.itemTotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.purchaseQuantity), 0);
    this.totalAmount = this.itemTotal + this.shippingTax;
    this.cartService.setTotalAmount(this.totalAmount);
  }

  public removeItem(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      // this.cartItems = this.cartItems.filter((item, i) => i !== index);
      this.cartService.removeFromCart(index);
      this.badgeService.decreaseBadgeCount();
      // this.calculateTotal();
      // Saves updated cart state to local storage
      // localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  public getQuantity(product: Product): number {
    return product.quantity;
  }

  public updateQuantity(index: number, newQuantity: number): void {
    const item = this.cartItems[index];
    item.purchaseQuantity = Math.max(1, Math.min(newQuantity, item.quantity));
    this.calculateTotal();
  }

  public checkout(): void {
    this.router.navigate(['/checkout'])
  }
}