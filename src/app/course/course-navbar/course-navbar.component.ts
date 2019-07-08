import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../course.model";

@Component({
  selector: 'app-course-navbar',
  templateUrl: './course-navbar.component.html',
  styleUrls: ['./course-navbar.component.css']
})
export class CourseNavbarComponent implements OnInit {
  @Input() course: Course;

  constructor() { }

  ngOnInit() {
  }

}
