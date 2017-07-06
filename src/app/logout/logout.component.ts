import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'logout',
  styles: [``],
  template: ` `
})

export class LogoutComponent {

  constructor( private route: Router, private authService: AuthService ) {
    this.authService.logout();
  }

}
