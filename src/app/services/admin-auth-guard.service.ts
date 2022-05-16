import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AppUser } from '../model/app-user';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}
  canActivate(): Observable<boolean> {
    return this.auth.user$
      .pipe(switchMap((user) => this.userService.get(user.uid)))
      .pipe(map((appUser: AppUser) => appUser.isAdmin));
  }
}
