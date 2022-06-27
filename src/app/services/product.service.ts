import { Injectable } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}
  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map(
            (a) => ({ key: a.key, ...(a.payload.val() as Product) } as Product)
          )
        )
      );
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
