import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/order.service';
import { BadgeService } from 'src/app/badge.service';
import { CartService } from 'src/app/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public submitted = false;
  public order: Order = {
    products: [],
    total: 0,
    name: '',
    address: '',
    orderTime: ''
  }
  public selectedProducts: { name: string; price: number; quantity: number; purchaseQuantity: number }[] = [];
  public selectedProductNames: String[] = [];
  public totalAmount: number;

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private badgeService: BadgeService,
              private router: Router) { }

  ngOnInit(): void {
    this.selectedProducts = this.cartService.getCartItems();
    this.selectedProductNames = this.cartService.getCartItemNames();
    this.cartService.totalAmount$.subscribe(totalAmount => {
      this.totalAmount = totalAmount;
    })
  }

  public placeOrder(): void {
    const currentDate = new Date();
    const dateTime = currentDate.toString();
    const orderProducts = this.selectedProducts.map(product => `${product.name}(${product.purchaseQuantity})`);
    const orderData = {
      products: orderProducts,
      total: this.totalAmount,
      name: this.order.name,
      address: this.order.address,
      orderTime: dateTime
    };
    this.orderService.addOrder(orderData).subscribe(response => {
      this.submitted = true;
      this.badgeService.resetBadgeCount();
    })
  }

  public updateProductQuantity(name: string, newQuantity: number): void {
    const product = this.selectedProducts.find(product => product.name === name);
    if (product) {
      product.quantity = newQuantity;
    }
  }

  public goHome(): void {
    this.router.navigate(['/home'])
  }
}
