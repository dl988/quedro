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
import { isNumeric } from 'rxjs/util/isNumeric';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductActions } from '../product.actions';

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

    function validateZipcode(c: FormControl) {
      return c.value.length === 5  ? null : {
        validateZipcode: {
          valid: false
        }
      };
    }

    function validateIsNumber (c: FormControl) {
      return isNumeric(c.value) ? null : {
        validateIsNumber: {
          valid: false
        }
      };
    }

    function validateType () {
      return (group: FormGroup) => {
        if (group.controls['price'].value === null) {
          return null;
        } else {
          return {
            validateType: {
              valid: false
            }
          }
        }
      }
    }

    function validatePrice () {
      return (group: FormGroup) => {
        if (group.controls['type'].value === null) {
          return {
            validatePrice: {
              valid: false
            }
          };
        } else {
          return null;
        }
      }
    }

    this.producForm = this.formBuilder.group({
      street: [null, Validators.required],
      zip: new FormControl('', [
        Validators.required,
        validateZipcode,
        validateIsNumber
      ]),
      city: [null, Validators.required],
      type: new FormControl(null, [
        validateType
      ]),
      price: new FormControl(null, [
        validatePrice,
        validateIsNumber
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
    console.log('save click ', this.producForm.value);
  }
}
