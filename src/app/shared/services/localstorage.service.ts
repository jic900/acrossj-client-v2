import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class LocalStorageService {

  jwtHelper: JwtHelper;
  tokenDeleted$: Subject<void>;

  constructor() {
    this.jwtHelper = new JwtHelper();
    this.tokenDeleted$ = new Subject<void>();
  }

  tokenNotExpired(): boolean {
    return tokenNotExpired('token');
  }

  tokenExistsAndExpired(): boolean {
    return localStorage.getItem('token') && !tokenNotExpired('token');
  }

  get(itemName: string): string {
    return localStorage.getItem(itemName);
  }

  set(itemName: string, itemValue: string): void {
    localStorage.setItem(itemName, itemValue);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    const decodedToken = this.jwtHelper.decodeToken(token);
    localStorage.setItem('user', JSON.stringify(decodedToken));
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.tokenDeleted$.next();
  }
}
