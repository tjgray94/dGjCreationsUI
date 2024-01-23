import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders!: Order[];
  public displayedColumns: string[] = ['number', 'name', 'action'];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    })
  }

  public deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe({ next:() => this.orders = this.orders.filter(order => order.orderId !== id) });
  }
}
