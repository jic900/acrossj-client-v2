import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aj-root',
  template: `
    <router-outlet></router-outlet>
  `
})

export class AppComponent {

  constructor(private _router: Router) {}

  logout(): void {
    this._router.navigate(['']);
  }
}
