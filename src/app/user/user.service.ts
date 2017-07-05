import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserActions } from './user.actions';

@Injectable()
export class UserService {
  user$: Observable<any>

  constructor (private actions: UserActions, private store: Store<any>) {
    this.user$ = store.select('user') as Observable<any>;
  }

  get (): void {}
}