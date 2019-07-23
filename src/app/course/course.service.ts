import { Injectable } from '@angular/core';
import {Course} from "./course.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  userCourses: Course[] = undefined;
  userCoursesChanged: Subject<Course[]>;

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }

  getUserCourses(user?: any) {
    if (!this.userCourses) {
      // get courses from server
      this.getUserCoursesRest().subscribe(data => {
        console.log(data);
        for (const course of (data as Course[])) {
          this.userCourses.push(course);
        }

      });
    } else {
    return this.userCourses.slice();
    }
  }

  getUserCoursesAnnouncements(user: any, course?: any[]) {

  }

  getCourseById(courseId: number) {

  }

  getCourseResourceById() {

  }

  getUserCoursesRest() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + this.authService.currentUser.token
        })
    };

    return this.httpClient.get('http://localhost:8082/spring-security-oauth-resource/user-courses', httpOptions)
      .pipe(map((data) => {
        console.log(data);
        this.userCourses = data as Course[];
        this.userCoursesChanged.next(this.userCourses);
        return data;
      }));
  }

  getAuthorizedResource(resourceUrl: string) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + this.authService.currentUser.token
        })
    };

    return this.httpClient.get(resourceUrl, httpOptions);
  }
}
