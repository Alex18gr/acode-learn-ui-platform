import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoursesService} from '../courses.service';
import {Subscription} from 'rxjs';
import {Course} from '../course.model';
import {CourseSection} from '../../core/models/course-section.model';

@Component({
  selector: 'app-course-sections',
  templateUrl: './course-sections.component.html',
  styleUrls: ['./course-sections.component.css']
})
export class CourseSectionsComponent implements OnInit, OnDestroy {
  courseChanged: Subscription;
  currentCourse: Course;
  courseSections: CourseSection[];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.currentCourse = this.coursesService.currentCourse;
    this.courseChanged = this.coursesService.currentCourseChanged
      .subscribe((course: Course) => {
        this.currentCourse = course;
        this.getCourseSections();
      });
    if (this.currentCourse) {
      this.getCourseSections();
    }
  }

  getCourseSections() {
    this.coursesService.getCourseSections(this.currentCourse)
      .subscribe((courseSections) => {
        this.courseSections = courseSections as unknown as CourseSection[];
        this.courseSections.sort((a: CourseSection, b: CourseSection) => {
          return a.order - b.order;
        });
      });
  }

  ngOnDestroy(): void {
    if (this.courseChanged) {
      this.courseChanged.unsubscribe();
    }
  }
}
