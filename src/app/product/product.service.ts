import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductService {
  products$: Observable<any>

  constructor(private actions: ProductActions, private store: Store<any>){
    this.products$ = store.select('products') as Observable<any>;
    // store.dispatch(this.actions.fetchSoldProducts());
    // store.dispatch(this.actions.fetchAvailableProducts());
  }
}