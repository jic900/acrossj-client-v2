import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aj-root',
  template: `
    <router-outlet></router-outlet>
  `
})

export class AppComponent {

  routes: Object[] = [{
    title: 'Dashboard',
    route: '/',
    icon: 'dashboard',
  }, {
    title: 'Product Dashboard',
    route: '/product',
    icon: 'view_quilt',
  }, {
    title: 'Product Logs',
    route: '/logs',
    icon: 'receipt',
  }, {
    title: 'Manage Users',
    route: '/users',
    icon: 'people',
  }];

  constructor(private _router: Router) {}

  logout(): void {
    this._router.navigate(['']);
  }
}
