import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category;
  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
  }
}
