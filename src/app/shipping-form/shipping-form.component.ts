import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserDetails } from '../shared/models/model';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  shipping: IUserDetails = {} as IUserDetails;
  @Input() cart;
  userSub: Subscription;
  userId: string;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) {

  }

  async ngOnInit() {
    this.userSub = this.authService.user$.subscribe(user=> this.userId = user.uid);
  }

  async placeOrder() {
    const order = new Order(this.cart, this.shipping, this.userId);
    const result = await this.orderService.placeOrder(order);  
    this.router.navigate(['order-success', result.key]);    
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
