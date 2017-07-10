import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { ProductActions } from '../product.actions';

@Component({
  selector: 'detail-product',
  styleUrls: [ './detail-product.component.scss' ],
  templateUrl: './detail-product.component.html'
})

export class DetailProductComponent implements OnInit {
  item: any;
  selectedProduct: Observable<any>;

  constructor ( 
    public route: ActivatedRoute, 
    public router: Router,
    public store: Store<any>,
    public productAction: ProductActions
  ) {
    this.selectedProduct = store.select('selectedProduct').take(1);
    this.item = {
      street: '123',
      zip: 'zip',
      city: 'city',
      type: 'type',
      price: '123',
      status: 'SOLD'
    }
  }

  public ngOnInit() {
    this.selectedProduct.subscribe(v => {
      if (v) {
        this.item = v;
      }
      console.log('selectedProduct')
    });
   // this.store.dispatch(this.productAction.fetchProduct());
  }

  // ngOnDestroy () {
  //   this.selectedProduct.unsubscribe();
  // }

  public close () {}
}
