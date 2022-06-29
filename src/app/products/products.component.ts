import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    productService.getAll().subscribe((products) => {
      this.products = products;
    });
    this.categories$ = this.categoryService.getAll();

    route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      if (this.category) {
        this.filteredProducts = this.products.filter(
          (p) => p.category === this.category
        );
      } else {
        this.products;
      }

      console.log(this.filteredProducts);
    });
  }
}
