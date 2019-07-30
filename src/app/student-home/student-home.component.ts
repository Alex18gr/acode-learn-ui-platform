import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

}
