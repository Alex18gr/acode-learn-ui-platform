import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-navbar-component',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css'],
})
export class HomeNavbarComponent implements OnInit {
  platformName: string;

  constructor(private authSerice: AuthService) {}

  ngOnInit() {
    this.platformName = 'Acode Learn';
  }

  isAuthenticated() {
    return this.authSerice.isAuthenticated;
  }

  onLogout() {
    this.authSerice.logout();
  }
}
