import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { BadgeService } from '../badge.service';
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

  constructor(private cartService: CartService, private badgeService: BadgeService, private router: Router) {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  ngOnInit(): void {
  }

  public calculateTotal(): void {
    this.itemTotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.totalAmount = this.itemTotal + this.shippingTax;
    this.cartService.setTotalAmount(this.totalAmount);
  }

  public removeItem(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems = this.cartItems.filter((item, i) => i !== index);
      this.badgeService.decreaseBadgeCount();
      this.calculateTotal();
    }
  }

  public updateQuantity(index: number): void {
    const item = this.cartItems[index];
    item.quantity = Math.max(1, Math.floor(item.quantity));
    this.calculateTotal();
  }

  public checkout(): void {
    this.router.navigate(['/checkout'])
  }
}