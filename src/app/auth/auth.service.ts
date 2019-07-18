import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthUserModel} from './auth-user.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthed = false;
  token: string;
  currentUser: AuthUserModel = null; // new AuthUserModel('demo', '', '', 1);
  currentUserSubject = new Subject<AuthUserModel>();
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  get isAuthenticated() {
    return this.currentUser != null;
  }

  // logout() {
  //   Cookie.delete('access_token');
  //   this.router.navigate(['/login']);
  // }

  loginWithUsernameAndPassword(username: string, password: string) {
    const customParams = new URLSearchParams();
    customParams.append('username', username);
    customParams.append('password', password);
    customParams.append('grant_type', 'password');
    customParams.append('client_id', 'uiPlatformClient');

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Basic ' + btoa('uiPlatformClient:secret')
        })
    };

    return this.httpClient.post('http://localhost:8081/spring-security-oauth-server/oauth/token', customParams.toString(), httpOptions)
      .pipe(map((data) => {
        console.log(data);
        return data;
      }));
  }

  setUser(user: AuthUserModel) {
    this.currentUser = user;
    this.currentUserSubject.next(user);

    // Keep the key to the local storage to keep login state after page reload
    localStorage.setItem('userData', JSON.stringify(this.currentUser));
    this.autoLogout(user.expiresIn);
  }

  autoLogout(expiresIn: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiresIn);
    console.log('Time set for ' + expiresIn + ' milliseconds');
  }

  autoLogin() {
    const userData: {
      _refreshToken: string,
      _token: string,
      tokenExpirationDate: Date,
      username: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    console.log('user data received from local storage via auto login method: ');
    console.log(userData);

    // tslint:disable-next-line:max-line-length
    const user: AuthUserModel = new AuthUserModel(userData.username, userData._token, userData._refreshToken, null, new Date(userData.tokenExpirationDate));
    if (user.token) {
      this.currentUser = user;
      this.currentUserSubject.next(user);
      this.autoLogout(user.expiresIn);
    }
  }

  logout() {
    // TODO: implement a method to logout from the authentication server...
    this.token = null;
    this.currentUser = null;
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
