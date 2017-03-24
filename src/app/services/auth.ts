import { Injectable } from '@angular/core';
// Chceck if can acrivate route
import { CanActivate, Router } from '@angular/router';
import { StoreHelper } from './store-helper';
import { Store } from '../store';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
// implement canActivate router sesrvice 
export class AuthService implements CanActivate {
  // Key of token stored in browser storage
  JWT_KEY: string = 'retain_token';
  // json web token value
  JWT: string = '';

  constructor (
    private router: Router,
    private store: Store,
    private storeHelper: StoreHelper,
    private api: ApiService
  ){
    // In constructor body is everything what should be made once

    // Get token from locale storage
    const token = window.localStorage.getItem(this.JWT_KEY);

    if (token) {
      this.setJwt(token);
    }
  }

  setJwt(jwt: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.api.setHeaders({Authorization: `Bearer ${jwt}`})
  }

  isAuthorized(): boolean {
    // Boolean() checks if this.JWT is true
    return Boolean(this.JWT);
  }

  // This method implements router changes. This is routher method CanActivate
  canActivate(): boolean {
    const canActivate = this.isAuthorized();
    this.onCanActivate(canActivate);
    return canActivate;
  }

  onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      // If not activated go to auth state
      this.router.navigate(['', 'auth']);
    }
  }

  // This is Observable
  authenticate(path, credits): Observable<any> {
    return this.api.post(`/${path}`, credits)
    .do((res: any) => this.setJwt(res.token))
    // Udates user object in store
    .do((res:any) => this.storeHelper.update('user', res.data))
    .map((res:any) => res.data)
  }

  signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    this.store.purge();
    this.router.navigate(['', 'auth']);
  }
}