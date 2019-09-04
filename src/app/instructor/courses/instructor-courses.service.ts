import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Course} from '../../course/course.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {map} from 'rxjs/operators';
import {CourseSection} from '../../core/models/course-section.model';

export enum CourseLoadingStatus {
  pending,
  loading,
  loaded,
  failed
}

export interface CoursesResponse {
  timestamp: string;
  courseList: any[];
}

@Injectable({
  providedIn: 'root'
})
export class InstructorCoursesService {
  coursesChanged = new Subject<Course[]>();
  currentCourse: Course = null;
  currentCourseLoadStatus = CourseLoadingStatus.pending;
  currentCourseChanged = new Subject<Course>();
  instructorCourses: Course[] = undefined;
  coursesLoaded = false;

  constructor(private httpClient: HttpClient,
              private authService: AuthService)
  { }

  getCourses() {
    return this.instructorCourses.slice();
  }

  getCourseById(id) {
    if (this.instructorCourses === undefined) {
      return null;
    }

    this.currentCourse = this.instructorCourses[id];
    this.currentCourseChanged.next(this.currentCourse);
    return this.instructorCourses[id];
  }

  findCourseNameById(id: number) {
    let courseName = '';
    this.instructorCourses.forEach(course => {
      if (course.id === id) {
        courseName = course.name;
      }
    });
    return courseName;
  }

  setCurrentCourse(course: Course) {
    this.currentCourse = course;
    this.currentCourseLoadStatus = CourseLoadingStatus.loaded;
  }

  getInstructorCourse(courseId: number) {
    this.currentCourseLoadStatus = CourseLoadingStatus.loading;
    this.receiveInstructorCourses().subscribe((courses: Course[]) => {
      for (const course of courses) {
        if (course.id === courseId) {
          this.currentCourse = course;
          this.currentCourseLoadStatus = CourseLoadingStatus.loaded;
          this.currentCourseChanged.next(course);
        }
      }
      this.currentCourseLoadStatus = CourseLoadingStatus.failed;
    });

  }

  receiveInstructorCourses() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + this.authService.currentUser.token
        })
    };

    this.coursesLoaded = false;
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<CoursesResponse>('http://localhost:8082/spring-security-oauth-resource/instructor/owned-courses', httpOptions)
      .pipe(map((data) => {
        console.log(data);
        const receivedCourses: Course[] = [];
        for (const courseData of data.courseList) {
          receivedCourses.push(new Course(courseData.id, courseData.title, courseData.description,
            null, courseData.semester, courseData.instructors));
        }
        this.instructorCourses = receivedCourses;
        this.coursesLoaded = true;
        return this.instructorCourses;
      }));
  }

  getCourseSections(course: Course) {
    const getCourseSectionsUrl = 'http://localhost:8082/spring-security-oauth-resource/course/' +
      course.id + '/sections';
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.currentUser.token);
    const options: any = {};
    options.headers = headers;
    return this.httpClient.get(getCourseSectionsUrl, options).pipe(map((data) => {
      console.log(data);
      for (const r of (data as any)) {
        r.resources = r.resources.resources;
      }
      return data;
    }));
  }

  updateCourseSection(courseSection: CourseSection, course: Course, courseSectionData) {
    const editCourseSectionsUrl = 'http://localhost:8082/spring-security-oauth-resource/course/' +
      course.id + '/sections/' + courseSection.courseSectionId;
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.currentUser.token);
    return this.httpClient.put(editCourseSectionsUrl, courseSectionData, {headers});
  }

  createCourseSection(courseSection: CourseSection, course: Course, courseSectionData) {
    const createCourseSectionsUrl = 'http://localhost:8082/spring-security-oauth-resource/course/' +
      course.id + '/sections';
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.currentUser.token);
    return this.httpClient.post(createCourseSectionsUrl, courseSectionData, {headers});
  }

  deleteCourseSection(courseSection: CourseSection, course: Course) {
    const editCourseSectionsUrl = 'http://localhost:8082/spring-security-oauth-resource/course/' +
      course.id + '/sections/' + courseSection.courseSectionId;
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.currentUser.token);
    return this.httpClient.delete(editCourseSectionsUrl, {headers});
  }
}
