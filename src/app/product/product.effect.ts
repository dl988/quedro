import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { ProductApi } from './product.api';
import { ProductActions } from './product.actions';
import { SelectedProductActions } from '../common/actions';

@Injectable()
export class ProductEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private api: ProductApi,
    private store$: Store<any>,
    private productActions: ProductActions,
    private selectedProductActions: SelectedProductActions
  ) {}

  @Effect()
  addProduct$ = this.actions$
    .ofType(ProductActions.ADD_PRODUCT)
    .switchMap((data) => this.api.addProduct(data.payload)
      .map(results => {
        const product = results.json();

        return this.productActions.addProductFulfilled({product})
      })
      .catch(error => Observable.of(this.productActions.addProductFailed(error)))
    );

  @Effect()
  updateProduct$ = this.actions$
    .ofType(ProductActions.UPDATE_PRODUCT)
    .switchMap((data) => this.api.updateProduct(data.payload.productId, data.payload.data)
      .map(results => {
        const product = results.json()['object'];
        this.router.navigate(['product']);

        return this.productActions.updatedProduct(product);
      })
      // .catch(error => Observable.of(this.productActions.addProductFailed(error)))
    );

  @Effect()
  fetchProduct$ = this.actions$
    .ofType(ProductActions.FETCH_PRODUCT)
    .switchMap((data) => this.api.fetchProduct(data.payload)
      .map(results => {
        const product = results.json()['object'];

        return this.selectedProductActions.selectProduct(product);
      })
      // .catch(error => Observable.of(this.productActions.fetchProductsFailed(error)))
    );

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