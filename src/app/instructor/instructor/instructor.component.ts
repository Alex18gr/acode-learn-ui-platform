import { Component, OnInit } from '@angular/core';
import {InstructorCoursesService} from '../courses/instructor-courses.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

  constructor(private instructorCoursesService: InstructorCoursesService) { }

  ngOnInit() {
    this.instructorCoursesService.receiveInstructorCourses();
  }

}
