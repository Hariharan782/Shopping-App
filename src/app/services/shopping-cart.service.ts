import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Product } from '../model/product';
import { take } from 'rxjs/operators';

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

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getCart(cartId) {
    this.db.object('/shopping-carts/' + cartId);
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let items$: AngularFireObject<any> = this.db.object(
      '/shopping-carts/' + cartId + '/items' + product.key
    );

    items$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        if (item.payload.exists())
          items$.update({
            product: product,
            quantity: item.payload.exportVal().quantity + 1,
          });
        else items$.set({ product: product, quantity: 1 });
      });
  }
}
