import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  styles: [`
  `],
  template: `
    <div class="b-user">
      <div class="buttons">
        <a [routerLink]=" ['/login'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}" class="btn btn-default">
          Login
        </a>
        <a [routerLink]=" ['/register'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}" class="btn btn-info">
          Register
        </a>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {


  constructor(private route: Router) {}

  public ngOnInit() {
    if (localStorage.getItem('logged_in')) {
      this.route.navigate(['product']);
    }
  }
}
