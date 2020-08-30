import { Component, OnInit, Input } from '@angular/core';
import { IProduct, IShoppingCart, IShoppingCartItem } from 'shared/models/model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input() product:IShoppingCartItem;
  @Input() cart: IShoppingCart;
  productDetails;
  filteredProducts = [];

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
}
