import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AuthUserModel} from "./auth-user.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthed = false
  token: string;
  currentUser: AuthUserModel = null;
  currentUserSubject = new Subject<AuthUserModel>();
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient) { }

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
}
