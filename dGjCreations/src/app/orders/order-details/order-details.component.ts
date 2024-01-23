import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/order.service';
import { CartService } from 'src/app/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  public currentOrder: Order = {
    products: [],
    name: '',
    address: '',
    total: 0
  };
  public orderId: number = 0;
  public id!: number;
  @Input() order!: Order;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['orderId'];
    this.orderService.getOrder(this.id).subscribe(data => {
      this.order = data;
    })
  }

  public onBack(): void {
    this.router.navigate(['/orders']);
  }

}
