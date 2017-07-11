import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { ProductActions } from '../product.actions';
import { ProductApi } from '../product.api';
import { SelectedProductActions } from '../../common/actions';

@Component({
  selector: 'detail-product',
  styleUrls: [ './detail-product.component.scss' ],
  templateUrl: './detail-product.component.html'
})

export class DetailProductComponent implements OnInit {
  public id: Observable<string>;
  public currentID: string;
  public item: any;
  public selectedProduct: Observable<any>;
  

  constructor ( 
    public route: ActivatedRoute, 
    public router: Router,
    public store: Store<any>,
    public productAction: ProductActions,
    public productApi: ProductApi,
    public selectedProductActions: SelectedProductActions
  ) {
    let that = this;
    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    const id: Observable<string> = child.params.map(p => p.id);
    this.id = id;

    this.selectedProduct = store.select('selectedProduct').take(2);
    this.item = {
      street: '',
      zip: '',
      city: '',
      type: '',
      price: '',
      sold: ''
    }
    
    this.id.subscribe(id => {
      that.currentID = id;
    });
  }

  public ngOnInit() {
    this.selectedProduct.subscribe(v => {
      if (v) {
        this.item = v;
      } else {
        this.store.dispatch(this.productAction.fetchProduct(this.currentID));
      }
    });
  }

  public close () {}
}
