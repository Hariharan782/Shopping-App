import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$;
  product: any = {};
  categories: any[];
  constructor(
    private categoryService: CategoryService,
    private productServics: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService
      .getCategories()
      .subscribe((message) => {
        this.categories = message;
      });
    let id = this.route.snapshot.paramMap.get('id');
    //take will take only 1 observable so no need to unsubscribe
    if (id)
      this.productServics
        .get(id)
        .pipe(take(1))
        .subscribe((p) => {
          this.product = p;
          console.log(this.product);
        });
  }

  save(product) {
    this.productServics.create(product);
    this.router.navigate(['/admin/products']);
  }
}
