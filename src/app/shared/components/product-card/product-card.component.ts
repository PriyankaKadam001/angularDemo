import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { IShoppingCartItem } from 'shared/models/model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(private cartService: ShoppingCartService) { }
  @Input() product;
  @Input() showAction;
  @Input() cart;
  productDetails;
  filteredProducts = [];

  ngOnInit(): void {
  this.productDetails = new IShoppingCartItem({...this.product.data, $key: this.product.key});
  }

  addToCart(){
   this.cartService.addToCart(this.productDetails);
  } 
}
