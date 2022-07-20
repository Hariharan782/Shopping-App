import { Component, OnInit } from '@angular/core';
import { AppUser } from '../model/app-user';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.AppUser$.subscribe((appUser) => (this.appUser = appUser));
    let cart$ = await this.shoppingCartService.getCart();
    cart$.snapshotChanges().subscribe((cart: any) => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.payload.val().items) {
        this.shoppingCartItemCount +=
          cart.payload.val().items[productId].quantity;
      }
    });
  }
  logout() {
    this.auth.logout();
  }
}
