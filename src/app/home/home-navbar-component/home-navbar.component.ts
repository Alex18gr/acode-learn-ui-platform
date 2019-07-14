import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-home-navbar-component',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  constructor(private authSerice: AuthService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authSerice.isAuthenticated;
  }

}
