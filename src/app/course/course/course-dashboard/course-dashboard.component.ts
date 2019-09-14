import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoursesService} from '../../courses.service';
import {Course} from '../../course.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent implements OnInit, OnDestroy {
  currentCourse: Course;
  currentCourseSubscription: Subscription;

  constructor(private coursesService: CoursesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentCourse = this.coursesService.currentCourse;
    this.currentCourseSubscription = this.coursesService.currentCourseChanged.subscribe(
      (course: Course) => {
        this.currentCourse = course;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.currentCourseSubscription) {
      this.currentCourseSubscription.unsubscribe();
    }
  }

  getInstructorsString() {
    if (this.currentCourse) {
      const instructors = this.currentCourse.instructors;
      let instructorsString = '';
      for (const instr of instructors) {
        instructorsString += instr.firstName + ' ' + instr.lastName;
        if (!(instructors.indexOf(instr) === instructors.length - 1)) {
          instructorsString += ', ';
        }
      }
      return instructorsString;
    } else {
      return '';
    }
  }

  navigateTo(destination: string) {
    this.router.navigate([destination], {
      relativeTo: this.route
    });
  }
}
