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
import { ActivatedRoute, Router } from '@angular/router';
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
  public currentID: number;
  public sub : any;

  constructor( public route: ActivatedRoute, public router: Router, public location: Location ) {
    const id: Observable<string> = route.params.map(p => p.id);
    const url: Observable<string> = route.url.map(segments => segments.join(''));
  }

  public ngOnInit() {
    let that = this;

    console.log('queryParams ',{
      params: this.route.params,
      url: this.route.url
    });

    this.route.params.subscribe(p => console.log('p.id ', p.id));

    this.route.url.subscribe(segments => console.log('segments ', segments.join('')));

    this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
      that.currentID = params['id'];
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

  public ngOnDestroy () {
    this.sub.unsubscribe();
  }
}
