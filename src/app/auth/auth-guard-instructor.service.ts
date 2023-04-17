import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardInstructorService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  // tslint:disable-next-line:max-line-length
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated) {
      const authorities = (
        jwt_decode(this.authService.currentUser.token) as any
      ).authorities;
      console.log(jwt_decode(this.authService.currentUser.token));
      console.log(authorities.indexOf('ROLE_TEACHER'));
      if (authorities.indexOf('ROLE_TEACHER') === -1) {
        return this.router.createUrlTree(['/login']);
      } else {
        return true;
      }
    }
    return this.router.createUrlTree(['/login']);
  }
}
