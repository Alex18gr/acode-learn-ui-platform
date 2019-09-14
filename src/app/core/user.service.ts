import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AuthUserModel} from '../auth/auth-user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService,
              private httpClient: HttpClient) { }

  getUserDetails() {
    const getUserDetailsUrl = 'http://localhost:8082/spring-security-oauth-resource/user';
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.currentUser.token);
    return this.httpClient.get(getUserDetailsUrl, {headers});
  }
}
