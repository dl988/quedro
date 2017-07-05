import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProductApi } from './product.api';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private api: ProductApi,
    private store$: Store<any>,
    private productActions: ProductActions
  ) {}

  @Effect()
  fetchProducts$ = this.actions$
    .ofType(ProductActions.FETCH_PRODUCTS)
    .switchMap(() => this.api.fetchProducts()
      .map(results => {
        const products = results.json();

        return this.productActions.fetchProductsFulfilled({
          products: products['objects']
        })
      })
      .catch(error => Observable.of(this.productActions.fetchProductsFailed(error)))
    );

  @Effect()
  fetchSoldProducts$ = this.actions$
    .ofType(ProductActions.FETCH_SOLD_PRODUCTS)
    .switchMap(() => this.api.fetchSoldProducts()
      .map(results => {
        const products = results.json();
        //return products;
        return this.productActions.soldProductsFetched({
          products: products['objects']
        })
      })
      .catch(error => Observable.of(this.productActions.fetchProductsFailed(error)))
    );

  @Effect()
  fetchAvailableProducts$ = this.actions$
    .ofType(ProductActions.FETCH_SOLD_PRODUCTS)
    .switchMap(() => this.api.fetchAvailableProducts()
      .map(results => {
        const products = results.json();

        return this.productActions.availableProductsFetched({
          products: products['objects']
        })
      })
      .catch(error => Observable.of(this.productActions.fetchProductsFailed(error)))
    );
}