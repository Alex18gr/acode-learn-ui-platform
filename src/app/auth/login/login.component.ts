import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AuthUserModel} from '../auth-user.model';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.authService.loginWithUsernameAndPassword(username, password)
      .subscribe((data: any) => {
        console.log(data);
        const user: AuthUserModel = new AuthUserModel(data.username, data.access_token, data.refresh_token, 3500);
        console.log(user);
        this.authService.currentUser = user;
        this.router.navigate(['/']);
      });
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.login(form.value.username, form.value.password);
    }
  }
}
