import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import {CoursesResponse, CoursesService} from "../courses.service";
import {Course} from "../course.model";
import {AuthService} from '../../auth/auth.service';
import {of, Subscription} from "rxjs";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  currentCourse: Course;
  currentCourseId: number;
  courses: Course[];
  dataLoaded = false;

  coursesSubscription: Subscription;

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
    this.coursesSubscription = this.coursesService.coursesChanged.subscribe(courses => this.courses = courses);
    this.route.params.subscribe((params: Params) => {
      this.currentCourseId = +params.id;
      this.currentCourse = this.coursesService.getCourseById(this.currentCourseId);
      if (this.currentCourse == null) {
        this.coursesService.getUserCoursesRest()
          .subscribe(data => {
            this.currentCourse = this.coursesService.getCourseById(this.currentCourseId);
            this.courses = data;
            this.dataLoaded = true;
          });
      // .subscribe((data) => {
      //     for (const course of data) {
      //       if (course.id === this.currentCourseId) {
      //         this.currentCourse = course;
      //       }
      //       // TODO: if course not found then we view an error
      //     }
      //   });
      } else {
        this.dataLoaded = true;
      }
    });
  }

  isActivated(): boolean {
    return this.authService.isAuthenticated;
  }

}
