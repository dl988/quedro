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

  constructor( public route: ActivatedRoute, public router: Router ) {}

  public ngOnInit() {
    let that = this;

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
}
