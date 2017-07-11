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
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductActions } from '../product.actions';
import { ValidationService } from '../form/validation.service';

@Component({
  selector: 'add-product',
  styles: [``],
  templateUrl: './add-product.component.html',
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

export class AddProductComponent implements OnInit {
  public menuState : string = 'out';
  public producForm: FormGroup;

  constructor( 
    public route: ActivatedRoute, 
    public router: Router,
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private productActions: ProductActions
  ) {}

  public ngOnInit() {
    let that = this;

    this.producForm = this.formBuilder.group({
      street: [null, Validators.required],
      zip: new FormControl('', [
        Validators.required,
        ValidationService.validateIsNumber,
        ValidationService.validateZipcode
      ]),
      city: [null, Validators.required],
      type: new FormControl(null, [
        ValidationService.validateType
      ]),
      price: new FormControl(null, [
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
      that.router.navigate( ['/product']);
    }, 400);
  }

  public save () {
    this.store.dispatch(this.productActions.addProduct(this.producForm.value));
  }
}
