import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'logout',
  styles: [`
    .b-logout {
      text-align: center;
    }
  `],
  template: `
    <div class="b-logout">
      <button type="button" class="btn btn-warning" (click)="logout()">Logout</button>
    </div>
  `
})

export class LogoutComponent {

  constructor(private route: Router) {}

  public logout () {
    localStorage.removeItem('logged_in');
    localStorage.removeItem('token');

    this.route.navigate(['home']);
  }

}
