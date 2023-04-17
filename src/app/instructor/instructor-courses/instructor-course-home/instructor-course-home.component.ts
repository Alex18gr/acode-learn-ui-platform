import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorCoursesService } from '../../courses/instructor-courses.service';
import { Course } from '../../../course/course.model';

@Component({
  selector: 'app-instructor-course-home',
  templateUrl: './instructor-course-home.component.html',
  styleUrls: ['./instructor-course-home.component.css'],
})
export class InstructorCourseHomeComponent implements OnInit {
  currentCourse: Course;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private instructorCoursesService: InstructorCoursesService
  ) {}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.currentCourse = this.instructorCoursesService.get(+params.cid);
    // });
  }

  navigateTo(destination: string) {
    this.router.navigate([destination], {
      relativeTo: this.route,
    });
  }
}
