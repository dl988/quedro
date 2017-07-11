import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

import { HttpClient } from '../http.client';

const API_TASKS_URL = '/api/objects';

@Injectable()
export class ProductApi {

  constructor(private http: HttpClient) {}

  updateProduct(productId, data): Observable<any> {

    return this.http.patch(`${API_TASKS_URL}/${productId}`, data);
  }

  addProduct(product): Observable<any> {

    return this.http.post(API_TASKS_URL, product);
  }

  fetchProduct(productId): Observable<any> {
    return this.http.get(`${API_TASKS_URL}/${productId}`);
  }

  fetchProducts(): Observable<any> {

    return this.http.get(API_TASKS_URL);
  }

  fetchSoldProducts(): Observable<any> {

    return this.http.get(`${API_TASKS_URL}?sold=true`);
  }

  fetchAvailableProducts(): Observable<any> {

    return this.http.get(`${API_TASKS_URL}?sold=false`);
  }

}