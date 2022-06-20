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
  id;
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
    this.id = this.route.snapshot.paramMap.get('id');
    //take will take only 1 observable so no need to unsubscribe
    if (this.id)
      this.productServics
        .get(this.id)
        .pipe(take(1))
        .subscribe((p) => {
          this.product = p;
          console.log(this.product);
        });
  }

  save(product) {
    if (this.id) this.productServics.update(this.id, product);
    else this.productServics.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('are u sure you want to delete this product?')) return;
    this.productServics.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
