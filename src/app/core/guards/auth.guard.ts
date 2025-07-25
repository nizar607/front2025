import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

// Auth Services
import {AuthenticationService} from '../services/auth.service';
import {AuthfakeauthenticationService} from '../services/authfake.service';
import {environment} from '../../../environments/environment';
import {NGXLogger} from "ngx-logger";

@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private logger:NGXLogger
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (environment.defaultauth === 'springboot') {
      if (JSON.parse(localStorage.getItem('currentUser') || "null")) {
        this.logger.info("here with : ",localStorage.getItem('currentUser'));
        return true;
      }
      this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
      return false;
    } else {
      if (environment.defaultauth === 'firebase') {
        const currentUser = this.authenticationService.currentUser();
        if (currentUser) {
          // logged in so return true
          return true;
        }
      } else {
        const currentUser = this.authFackservice.currentUserValue;
        if (currentUser) {
          // logged in so return true
          return true;
        }
        // check if user data is in storage is logged in via API.
        if (localStorage.getItem('currentUser')) {
          return true;
        }
      }
      // not logged in so redirect to login page with the return url

    }
    this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
