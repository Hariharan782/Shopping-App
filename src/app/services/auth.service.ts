import { Injectable, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from '@firebase/auth';
import { observable, Observable } from 'rxjs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../model/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;
  user: firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState;
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.signOut();
  }
  get AppUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid);
        else return of(null);
      })
    );
  }
}
