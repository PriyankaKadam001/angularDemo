import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) { }

  products: any = [];
  activeCategory;
  filteredProducts = [];
  cart$;

  async ngOnInit() {
    this.populateProduct();
    this.cart$ = (await this.cartService.getCart());
  }

  filterByCategory() {
    this.filteredProducts = this.activeCategory ? this.products.filter(product => product.data.category === this.activeCategory) : this.products;
  }

  populateProduct() {
    this.productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }))
      .subscribe(category => {
        this.activeCategory = category.get('category');
        this.filterByCategory();
      });
  }
}
