import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    let loggedIn = localStorage.getItem('logged_in');

    if (!loggedIn) {

      this.router.navigate(['login']);
      return false;
    };

    return true;
  }
}