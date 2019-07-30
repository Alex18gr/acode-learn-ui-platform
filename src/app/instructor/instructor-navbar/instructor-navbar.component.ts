import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-instructor-navbar',
  templateUrl: './instructor-navbar.component.html',
  styleUrls: ['./instructor-navbar.component.css']
})
export class InstructorNavbarComponent implements OnInit {
  instructorPlatformTitle: string;

  constructor(private authSerice: AuthService) { }

  ngOnInit() {
    this.instructorPlatformTitle = 'Acode - Instructor';
  }

  isAuthenticated() {
    return this.authSerice.isAuthenticated;
  }

  onLogout() {
    this.authSerice.logout();
  }
}
