import { Component, OnInit } from '@angular/core';
import {InstructorCoursesService} from '../courses/instructor-courses.service';
import {Course} from '../../course/course.model';

@Component({
  selector: 'app-instructor-course-list',
  templateUrl: './instructor-course-list.component.html',
  styleUrls: ['./instructor-course-list.component.css']
})
export class InstructorCourseListComponent implements OnInit {
  courses: Course[];

  constructor(private instructorCoursesService: InstructorCoursesService) { }

  ngOnInit() {
    this.instructorCoursesService.receiveInstructorCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

}
