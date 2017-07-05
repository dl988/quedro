import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserApi } from './user.api';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffect {
  constructor (
    private actions$: Actions,
    private api: UserApi,
    private store$: Store<any>,
    private userActions: UserActions 
  ) {}

  @Effect()
  fetchUser$ = this.actions$
    .ofType(UserActions.FETCH_USER)
    .switchMap((data) => {
      return this.api.fetchUser(data.payload.user)
      .map(user => {

        return this.userActions.userFetched({
          user: user.json(),
          token: user.headers._headers.get('x-auth')[0]
        })
      })
      .catch(error => Observable.of(this.userActions.fetchUserFailed({error: error.json()})))
    })
}