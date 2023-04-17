import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export interface CoursesResponse {
  timestamp: string;
  courseList: any[];
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  coursesChanged = new Subject<Course[]>();
  currentCourse = null;
  currentCourseChanged = new Subject<Course>();

  // private courses: Course[] = [
  //   new Course(1001, 'Introduction to Mathmatics', 'This is a course about mathematics...', 'John', 3, null),
  //   new Course(1002, 'Introduction to Programming', 'This is a course about programming.', 'John', 2, null),
  //   new Course(1003, 'Introduction to Probability', 'This is a course about probability', 'Tom', 5, null),
  //   new Course(1003, 'Introduction to Object Oriented Programming', 'This is a course about OOP', 'Tom', 5, null),
  //   new Course(1003, 'Web Technologies', 'This is a course about web', 'Ben', 4, null),
  //   new Course(1003, 'Introduction to Computer science', 'This is a course about computer science', 'Ben', 1, null),
  //   new Course(1003, 'Embedded Systems', 'This is a course about arduino and raspberry', 'Ben', 6, null)
  // ];

  userCourses: Course[] = undefined;
  userCoursesReceivedTimestamp: Date = new Date();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  setCourses(courses: Course[]) {
    this.userCourses = courses;
    this.coursesChanged.next(this.userCourses.slice());
  }

  getCourses() {
    return this.userCourses.slice();
  }

  getCourseById(id) {
    if (this.userCourses === undefined) {
      return null;
    }

    // this.currentCourse = this.userCourses[id];
    for (const course of this.userCourses) {
      if (course.id === id) {
        this.currentCourse = course;
        this.currentCourseChanged.next(this.currentCourse);
        return this.currentCourse;
      }
    }

    return null;
  }

  findCourseNameById(id: number) {
    let courseName = '';
    this.userCourses.forEach((course) => {
      if (course.id === id) {
        courseName = course.name;
      }
    });
    return courseName;
  }

  getUserCourses(user?: any): Observable<void> {
    return this.getUserCoursesRest().pipe(
      map((data) => {
        this.userCourses = [];
        for (const course of data as Course[]) {
          console.log(course);
          this.userCourses.push(course);
        }
        this.coursesChanged.next(this.userCourses);
      })
    );
  }

  getUserCoursesRest() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Bearer ' + this.authService.currentUser.token,
      }),
    };

    return this.httpClient
      .get<CoursesResponse>(
        'http://localhost:8082/spring-security-oauth-resource/user-courses',
        httpOptions
      )
      .pipe(
        map((data) => {
          console.log(data);
          if (
            this.userCoursesReceivedTimestamp == null ||
            new Date(data.timestamp) !== this.userCoursesReceivedTimestamp
          ) {
            const receivedCourses: Course[] = [];
            for (const courseData of data.courseList) {
              receivedCourses.push(
                new Course(
                  courseData.id,
                  courseData.title,
                  courseData.description,
                  null,
                  courseData.semester,
                  courseData.instructors
                )
              );
            }
            this.userCoursesReceivedTimestamp = new Date(
              (data as any).timestamp
            );
            this.userCourses = receivedCourses;
          }
          this.coursesChanged.next(this.userCourses);
          return this.userCourses;
        })
      );
  }

  getAuthorizedResource(resourceUrl: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Bearer ' + this.authService.currentUser.token,
      }),
    };

    return this.httpClient.get(resourceUrl, httpOptions);
  }
  getCourseSections(course: Course) {
    const getCourseSectionsUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      course.id +
      '/sections';
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    const options: any = {};
    options.headers = headers;
    return this.httpClient.get(getCourseSectionsUrl, options).pipe(
      map((data) => {
        console.log(data);
        // for (const r of (data as any)) {
        //   r.resources = r.resources.resources;
        // }
        return data;
      })
    );
  }

  getCourseSection(courseId: number, sectionId: number) {
    const getCourseSectionUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      courseId +
      '/sections/' +
      sectionId;
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    const options: any = {};
    options.headers = headers;
    return this.httpClient.get(getCourseSectionUrl, options);
  }
}
