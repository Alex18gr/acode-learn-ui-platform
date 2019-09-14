import { Component, OnInit } from '@angular/core';
import {User} from '../../core/models/user.model';
import {UserService} from '../../core/user.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserDetails().subscribe((data: User) => {
      this.currentUser = data;
    });
  }

}
