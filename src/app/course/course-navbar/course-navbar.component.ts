import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Course} from '../course.model';
import { CoursesService } from '../courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-navbar',
  templateUrl: './course-navbar.component.html',
  styleUrls: ['./course-navbar.component.css']
})
export class CourseNavbarComponent implements OnInit, OnDestroy {
  @Input() course: Course = new Course(-1, '', '', '', -1, []);
  @Input() courseIndex: any;
  @Input() courses: Course[] = [];
  @Input() dataLoaded: boolean;

  coursesChanged: Subscription;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.userCourses;
    this.coursesChanged = this.coursesService.coursesChanged.subscribe((courses: Course[]) => {
      this.courses = courses;
    });
    // this.courses = this.coursesService.userCourses;
    // this.courses = this.coursesService.userCourses;
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
