import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductActions } from '../product.actions';

@Component({
  selector: 'detail-product',
  styleUrls: [ './detail-product.component.scss' ],
  templateUrl: './detail-product.component.html'
})

export class DetailProductComponent implements OnInit {
  public item = {
    street: '123',
    zip: 'zip',
    city: 'city',
    type: 'type',
    price: '123',
    status: 'SOLD'
  }

  constructor ( 
    public route: ActivatedRoute, 
    public router: Router,
    public store: Store<any>,
    public productAction: ProductActions
  ) {}

  public ngOnInit() {
    this.store.dispatch(this.productAction.fetchProduct());
  }

  public close () {}
}
