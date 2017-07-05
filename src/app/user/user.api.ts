import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const API_TASKS_URL = '/api';

@Injectable()
export class UserApi {

  constructor (private http: Http) {}

  fetchUser (user: any): Observable<any> {
    return this.http.post(`${API_TASKS_URL}/users/login`, user)
  }
}