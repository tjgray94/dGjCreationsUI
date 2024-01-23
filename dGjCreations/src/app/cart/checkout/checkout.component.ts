import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/order.service';
import { CartService } from 'src/app/cart.service';

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
  public selectedProducts: { name: string; price: number; quantity: number }[] = [];
  public selectedProductNames: String[] = [];
  public totalAmount: number;

  constructor(private cartService: CartService, private orderService: OrderService) { }

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
    const orderData = {
      products: this.selectedProductNames,
      total: this.totalAmount,
      name: this.order.name,
      address: this.order.address,
      orderTime: dateTime
    };
    this.orderService.addOrder(orderData).subscribe(response => {
      this.submitted = true;
    })
  }

}
