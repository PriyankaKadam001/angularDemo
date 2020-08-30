import { Component } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  cart$;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
