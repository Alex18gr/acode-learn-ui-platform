import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {InstructorCoursesService} from '../../courses/instructor-courses.service';
import {Course} from '../../../course/course.model';
import {ActivatedRoute, Params, Route} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-instructor-course-dashboard',
  templateUrl: './instructor-course-dashboard.component.html',
  styleUrls: ['./instructor-course-dashboard.component.css']
})
export class InstructorCourseDashboardComponent implements OnInit, OnChanges, OnDestroy {
  currentCourse: Course;
  currentCourseStatus: number;
  courseSubscription: Subscription;

  constructor(private instructorCoursesService: InstructorCoursesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.instructorCoursesService.currentCourseChanged.subscribe((course: Course) => {
      this.currentCourse = course;
    });
    this.currentCourse = this.instructorCoursesService.currentCourse;
    this.currentCourseStatus = this.instructorCoursesService.currentCourseLoadStatus;
    this.route.params.subscribe((params: Params) => {
      this.instructorCoursesService.getInstructorCourse(+params.id);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }

}
