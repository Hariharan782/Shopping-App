import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Product } from '../model/product';
import { take } from 'rxjs/operators';
import { async } from '@firebase/util';
import { shoppingCart } from '../model/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db
      .list('/shopping-carts')
      .push({ dateCreated: new Date().getTime() });
  }

  async getCart(): Promise<AngularFireObject<shoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: Number) {
    let cartId = await this.getOrCreateCartId();
    let items$: AngularFireObject<any> = this.getItem(cartId, product.key);
    items$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        if (item.payload.exists())
          items$.update({
            product: product,
            quantity: item.payload.exportVal().quantity + change,
          });
        else items$.set({ product: product, quantity: 0 });
      });
  }
}
