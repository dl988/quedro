import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'home',
  styles: [`
  `],
  template: `
    <div class="b-user">
      <div *ngIf="!loginStatus" class="buttons">
        <a [routerLink]=" ['/login'] " class="btn btn-default">
          Login
        </a>
        <a [routerLink]=" ['/register'] " class="btn btn-info">
          Register
        </a>
      </div>

      <div *ngIf="loginStatus" class="buttons">
        <a [routerLink]=" ['/product'] " class="btn btn-primary">
          Products
        </a>
        <a [routerLink]=" ['/logout'] " class="btn btn-danger">
          Logout
        </a>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  public loginStatus: boolean = false;

  constructor( private route: Router, private authService: AuthService ) {}

  public ngOnInit() {
    this.loginStatus = this.authService.isLoggedIn();
  }
}
