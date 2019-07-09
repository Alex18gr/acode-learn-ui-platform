import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Course} from "../course.model";
import { CoursesService } from '../courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-navbar',
  templateUrl: './course-navbar.component.html',
  styleUrls: ['./course-navbar.component.css']
})
export class CourseNavbarComponent implements OnInit, OnDestroy {
  @Input() course: Course;
  @Input() courseIndex: any;
  courses: Course[];

  coursesChanged: Subscription;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.getCourses();
    this.coursesChanged = this.coursesService.coursesChanged.subscribe((courses: Course[]) => {
      this.courses = courses;
    });
  }

  getCourses() {
    this.courses = this.coursesService.getCourses();
    if (this.courseIndex > -1) {
      this.courses.splice(this.courseIndex, 1);
    }
  }

  ngOnDestroy() {
    this.coursesChanged.unsubscribe();
  }

}
