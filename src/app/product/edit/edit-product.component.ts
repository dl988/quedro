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
import { Location } from '@angular/common';
import { Observable } from "rxjs/Observable";

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
  public sub : any;

  constructor( 
    public route: ActivatedRoute, 
    public router: Router, 
    public location: Location,
  ) {

    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    const id: Observable<string> = child.params.map(p => p.id);
    this.id = id;
  }

  public ngOnInit() {
    let that = this;

    this.id.subscribe(id => {

      console.log('p.id ', id);
      that.currentID = id;
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

  public ngOnDestroy () {}
}
