import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('showActions') showActions = true;

  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
