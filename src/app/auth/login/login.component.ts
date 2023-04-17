import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthUserModel } from '../auth-user.model';
import { NgForm } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login(username: string, password: string) {
    this.authService
      .loginWithUsernameAndPassword(username, password)
      .subscribe((data: any) => {
        console.log(data);
        const user: AuthUserModel = new AuthUserModel(
          data.username,
          data.access_token,
          data.refresh_token,
          3500
        );
        console.log(user);
        this.authService.setUser(user);

        // decode the JWT key to find the user roles
        const jwtDecodedData = jwt_decode(user.token);
        if (
          (jwtDecodedData as any).authorities.indexOf('ROLE_TEACHER') !== -1
        ) {
          this.router.navigate(['instructor']);
        } else if (
          (jwtDecodedData as any).authorities.indexOf('ROLE_STUDENT') !== -1
        ) {
          this.router.navigate(['/']);
        }
      });
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.login(form.value.username, form.value.password);
    }
  }
}
