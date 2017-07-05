import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'header',
  styleUrls: [ './header.component.scss' ],
  template: `
  
    <div class="b-header layout">
      <div class="layout-left logo">
        <a [routerLink]=" ['/'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          <i class="fa fa-home" aria-hidden="true"></i>
        </a>
      </div>
      <div class="layout-right menu">
        <a *ngIf="buttons['addProduct']" class="btn btn-success" [routerLink]=" ['/product', {outlets: {'sidebar': ['add']}}] ">
          <i class="fa fa-plus" aria-hidden="true"></i>
          Create new
        </a>
      </div>
      <div class="layout-middle">
        <div class="search-form">
          <form>
            <div class="wrap-form">
              <button class="btn btn-primary">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
              <input type="text"/>
            </div>
          </form>
        </div>
      </div>
    </div> 
  `
})

export class HeaderComponent implements OnInit, OnDestroy {
  public buttons: any = {};

  constructor(
    public router : Router, 
    public location: Location
  ) {
  }

  public ngOnInit() {
    let urlBeginsWith = function (url, string) {
      return (url.indexOf(string) === 0);
    };

    this.router.events.subscribe(event => {
      let currrentPath = this.location.path();
      let isProductPage = urlBeginsWith(currrentPath, '/product');

      this.buttons['addProduct'] = isProductPage ? true : false;
    });
  }

  public ngOnDestroy() {
    console.log('ngOnDestroy');
  }

}
