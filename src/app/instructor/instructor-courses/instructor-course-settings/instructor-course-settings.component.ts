import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstructorCoursesService } from '../../courses/instructor-courses.service';
import { Course } from '../../../course/course.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instructor-course-settings',
  templateUrl: './instructor-course-settings.component.html',
  styleUrls: ['./instructor-course-settings.component.css'],
})
export class InstructorCourseSettingsComponent implements OnInit, OnDestroy {
  currentCourse: Course;
  courseChangedSubscription: Subscription;

  constructor(private instructorCoursesService: InstructorCoursesService) {}

  ngOnInit() {
    this.currentCourse = this.instructorCoursesService.currentCourse;
    this.courseChangedSubscription =
      this.instructorCoursesService.currentCourseChanged.subscribe(
        (course: Course) => {
          this.currentCourse = course;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.courseChangedSubscription) {
      this.courseChangedSubscription.unsubscribe();
    }
  }
}
