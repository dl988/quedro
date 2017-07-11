import {
  Component,
  OnInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import Rx from 'rxjs/Rx';
import { UserService } from '../../user/';

// Product
import { ProductService } from '../product.service';
import { ProductApi } from '../product.api';
import { ProductActions } from '../product.actions';

// Commons
import { SelectedProductActions } from '../../common/actions';

@Component({
  selector: 'product',
  styleUrls: [ './product.component.scss' ],
  templateUrl: './product.component.html',
  animations: [
    trigger('animate', [
      state('hide', style({
        opacity: 0
      })),
      state('shoe', style({
        opacity: 1
      })),
      transition('hide => show', animate('400ms')),
      transition('show => hide', animate('400ms'))
    ]),
  ]
})

export class ProductComponent implements OnInit {
  public products: Observable<any>;
  public user: Observable<any>;
  static apiFetched = false;
  public loadingStatus = !ProductComponent.apiFetched;
  public animate = ProductComponent.apiFetched ? 'show' : 'hide';

  public localState = { value: '' };

  constructor (
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    public productService: ProductService,
    public productApi: ProductApi,
    public productActions: ProductActions,
    public selectedProductActions: SelectedProductActions
  ) {
    this.products = store.select('products');
    this.user = store.select('user');
  }

  public ngOnInit () {
    if (!ProductComponent.apiFetched) this.fetchProducts();
  }

  public fetchProducts () {
    let that = this;

    var soldProducts = this.productApi.fetchSoldProducts();
    var availableProducts = this.productApi.fetchAvailableProducts();

    Rx.Observable.concat(soldProducts, availableProducts).reduce((acc:Array<any>, x:any) => {
        acc.push(x); return acc;
    }, []).subscribe(result=> {
      var firstEmitted = result[0].json()['objects'];
      var secondEmitted = result[1].json()['objects'];

      ProductComponent.apiFetched = true;
      that.loadingStatus = !ProductComponent.apiFetched;
      that.animate = 'show';

      that.store.dispatch(that.productActions.fetchProductsFulfilled({
        products: [...firstEmitted, ...secondEmitted]
      }))
    });
  }

  public selectProduct (product) {
    console.log('select product ', product);
    this.store.dispatch(this.selectedProductActions.selectProduct(product));
    this.router.navigate(['/detail', product._id]);
  }
}
