import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
 
  order$;
  
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.order$ = this.orderService.getOrder();
  }

}
