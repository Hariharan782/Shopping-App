import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}
  getAll() {
    return this.db
      .list('/categories', (ref) => ref.orderByChild('type'))
      .snapshotChanges();
  }
}
