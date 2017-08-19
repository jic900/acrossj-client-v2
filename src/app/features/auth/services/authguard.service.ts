/**
 * Created by LAE84266 on 13/06/2017.
 */

import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.authenticated) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    // let sessionId = 123456789;
	//
    // // Set our navigation extras object
    // // that contains our global query params and fragment
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {'session_id': sessionId},
    //   fragment: 'anchor'
    // };

    // Navigate to the login page with extras
    this.router.navigate(['/auth/signin']);
    return false;
  }
}


// import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
// import { AuthService } from './auth.service';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//
//   constructor(private auth: AuthService, private router: Router) {}
//
//   canActivate() {
//     if (!this.auth.authenticated) {
//       this.router.navigate(['']);
//       // this.router.navigate(['unauthorized']);
//       return false;
//     }
//     return true;
//   }
// }
