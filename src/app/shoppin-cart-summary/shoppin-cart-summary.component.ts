import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shoppin-cart-summary',
  templateUrl: './shoppin-cart-summary.component.html',
  styleUrls: ['./shoppin-cart-summary.component.css']
})
export class ShoppinCartSummaryComponent implements OnInit {
  @Input() cart;

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit() {
    console.log(this.cart);
  }

}
