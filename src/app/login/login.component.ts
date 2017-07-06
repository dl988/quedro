import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';

import { 
  UserService, 
  UserActions 
} from '../user/';

@Component({
  selector: 'login',
  styles: [`
    .b-login form { max-width: 30%; margin: auto}
  `],
  template: `
    <div class="b-login">
      <form [formGroup]="myForm" novalidate (ngSubmit)="login()">
        <div class="form-group">
          <label for="username">User name:</label>
          <input type="text" class="form-control" id="username" placeholder="User name" formControlName="username" />
        </div>

        <div class="form-group">
          <label for="password">Password :</label>
          <input type="password" class="form-control" id="password" placeholder="Password" formControlName="username" />
        </div>

        <small [hidden]="myForm.controls.username.valid || (myForm.controls.username.pristine && !submitted)">
          Name is required (minimum 5 characters).
        </small>

        <button (click)="logging($event.target, 'Loading ...')" type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  `
})
export class LoginComponent implements OnInit {

  public localState: any;
  public myForm: FormGroup;
  public events: any[] = []; 
  user: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private store: Store<any>,
    public userService: UserService,
    public userActions: UserActions
  ) {
    this.user = store.select('user');
  }

  public ngOnInit() {
    this.user.subscribe((v) => {
      console.log('user subcrible ', v);

      if (v && v.token) this.loggedIn(v);
    });

    if (localStorage.getItem('logged_in')) {
      this.route.navigate(['product']);
    }

    this.myForm = this.formBuilder.group({
        username: ['linh@quedro.com'],
        password: ['abc123'],
    });
  }

  public login () {
    let isValid = this.myForm.valid;
    let { username, password } = this.myForm.value;
    
    this.store.dispatch(this.userActions.fetchUser({
      email: username,
      password
    }));
  }

  public logging (element, text) {
    element.textContent = text;
    element.disabled = true;

    this.login();
  }

  public loggedIn (user) {
    localStorage.setItem('logged_in', 'true');
    localStorage.setItem('token', user.token);

    this.route.navigate(['product']);
  }

}
