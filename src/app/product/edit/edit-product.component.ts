import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { ProductActions } from '../product.actions';
import { ValidationService } from '../form/validation.service';

@Component({
  selector: 'edit-product',
  styles: [``],
  templateUrl: './edit-product.component.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})

export class EditProductComponent implements OnInit, OnDestroy {
  public menuState : string = 'out';
  public id: Observable<string>;
  public currentID: string;
  public item: any;
  public selectedProduct: Observable<any>;
  public producForm: FormGroup;

  constructor( 
    public route: ActivatedRoute, 
    public router: Router,
    public store: Store<any>,
    public location: Location,
    private formBuilder: FormBuilder,
    private productActions: ProductActions
  ) {

    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    const id: Observable<string> = child.params.map(p => p.id);
    this.id = id;
    this.selectedProduct = store.select('selectedProduct').take(2);
  }

  public ngOnInit() {
    let that = this;

    this.selectedProduct.subscribe(v => {
      if (v) {
        this.item = v;
      }
    });

    this.id.subscribe(id => {
      that.currentID = id;
    });

    this.producForm = this.formBuilder.group({
      street: [this.item? this.item.street : null, Validators.required],
      zip: new FormControl(this.item? this.item.zip : null, [
        Validators.required,
        ValidationService.validateIsNumber,
        ValidationService.validateZipcode
      ]),
      city: [this.item? this.item.city : null, Validators.required],
      type: new FormControl(this.item? this.item.type : null, [
        ValidationService.validateType
      ]),
      price: new FormControl(this.item? this.item.price : null, [
        ValidationService.validatePrice,
        ValidationService.validateIsNumber
      ])
    });

    setTimeout(() => {
      that.menuState = 'in';
    }, 50);
  }

  public close () {
    let that = this;
    this.menuState = this.menuState === 'in' ? 'out': 'in';
    
    setTimeout(() => {
      that.router.navigate( ['detail', this.currentID]);
    }, 400);
  }

  public save () {
    this.store.dispatch(this.productActions.updateProduct({
      productId: this.currentID,
      data: this.producForm.value
    }));
  }

  public ngOnDestroy () {}
}
