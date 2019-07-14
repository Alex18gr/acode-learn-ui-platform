import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import {CoursesService} from "../courses.service";
import {Course} from "../course.model";
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  currentCourse: Course;
  currentCourseId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private coursesService: CoursesService,
              private authService: AuthService) { }

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.coursesService.getCourseById(params.get('id'))
    //   )
    // );

    this.route.params.subscribe((params: Params) => {
      this.currentCourseId = +params.id;
      this.currentCourse = this.coursesService.getCourseById(this.currentCourseId);
    });
  }

  isActivated(): boolean {
    return this.authService.isAuthenticated;
  }

}
