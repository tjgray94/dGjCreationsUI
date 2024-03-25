import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/order.service';
import { BadgeService } from 'src/app/badge.service';
import { CartService } from 'src/app/cart.service';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public submitted = false;
  public products!: Product[];
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
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.selectedProducts = this.cartService.getCartItems();
    this.selectedProductNames = this.cartService.getCartItemNames();
    this.cartService.totalAmount$.subscribe(totalAmount => {
      this.totalAmount = totalAmount;
    })
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
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
    this.selectedProducts.forEach(product => {
      const updatedQuantity = product.quantity - product.purchaseQuantity;
      console.log(`Updating quantity for ${product.name}: ${updatedQuantity}`);
      const matchedProduct = this.products.find(p => p.name === product.name);
      if (matchedProduct) {
        const productId = matchedProduct.productId;
        console.log(productId)
        this.productService.updateProductQuantity(productId, updatedQuantity).subscribe();
      }
    })
    this.cartService.clearCart();
  }

  public goHome(): void {
    this.router.navigate(['/home'])
  }
}
