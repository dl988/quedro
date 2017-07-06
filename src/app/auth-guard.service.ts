import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    let loggedIn = this.authService.isLoggedIn();

    if (!loggedIn) {

      this.router.navigate(['login']);
      return false;
    };

    return true;
  }
}