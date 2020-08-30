import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'admin-app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products;
  filteredProducts;
  subscr;
  constructor(private router: Router, private productService: ProductService) { }
  ngOnInit(): void {
    this.subscr = this.productService.getAll().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }
  gotoProductForm() {
    this.router.navigateByUrl('admin/products/new');
  }
  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }

  filter(query:string){
    this.filteredProducts  =  query? this.products.filter(product=> product.title.toLowerCase().includes(query.toLowerCase())) : this.products;
      
  }
  show(product){
    console.log(product);
  }
}
