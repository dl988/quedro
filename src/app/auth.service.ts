import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from './user';

@Injectable()
export class AuthService {

  constructor ( private route: Router, private store: Store<any> , private userActions : UserActions) {}

  public isLoggedIn () {
    return localStorage.getItem('logged_in') ? true : false;
  }

  public logout () {
    localStorage.removeItem('logged_in');
    localStorage.removeItem('token');

    this.store.dispatch(this.userActions.logoutUser());
    this.route.navigate(['home']);
  }
}