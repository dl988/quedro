import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class HttpClient {

  constructor (private http: Http, private authService: AuthService) {}

  createAuthorizationHeader (headers: Headers) {
    headers.append('x-auth', this.authService.getUserToken()); 
  }

  get (url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    
    return this.http.get(url, {
      headers: headers
    });
  }

  post (url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.post(url, data, {
      headers: headers
    });
  }

  patch (url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.patch(url, data, {
      headers: headers
    });
  }
}