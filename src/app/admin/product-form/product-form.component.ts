import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoryList$;
  productForm: FormGroup = new FormGroup({});
  id;
  showAction
  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getAll();
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]]
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.getDataOfSelectedId(this.id);
    }
  }
  save(product) {
    if (this.id) {
      this.productService.update(this.id, this.productForm.value);
    }
    else{
      this.productService.create(this.productForm.value);
    }
    this.router.navigate(['/admin/products']);
    // console.log(this.productForm);
  }
  get f() { return this.productForm.controls; }
  getDataOfSelectedId(productId) {
    this.productService.get(productId).valueChanges().subscribe((product: any) => {
      this.productForm.patchValue({
        category: product.category,
        price: product.price,
        imageUrl: product.imageUrl,
        title: product.title
      })
    })
  }

  delete(){
    if(!confirm("Are your sure you want to delete the product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
