import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { UserService } from '../core/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // public afAuth: AngularFireAuth,
    //  public userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //   console.log('In canActivate: ' + state.url);
    return this.checkLoggedIn(state.url);
  }
  checkLoggedIn(url: string): boolean {
    console.log(this.authService.isLoggedIn(), 'this.authService.isLoggedIn()');

    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Retain the attempted URL for redirection
    //  this.authService.redirectUrl = url;
    this.router.navigate(['auth/login']);
    return false;
  }
}
