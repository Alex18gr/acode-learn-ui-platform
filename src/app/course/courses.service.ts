import { Injectable } from '@angular/core';
import {Course} from './course.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesChanged = new Subject<Course[]>();

  private courses: Course[] = [
    new Course(1001, 'Introduction to Mathmatics', 'This is a course about mathematics...', 'John', 3),
    new Course(1002, 'Introduction to Programming', 'This is a course about programming.', 'John', 2),
    new Course(1003, 'Introduction to Probability', 'This is a course about probability', 'Tom', 5),
    new Course(1003, 'Introduction to Object Oriented Programming', 'This is a course about OOP', 'Tom', 5),
    new Course(1003, 'Web Technologies', 'This is a course about web', 'Ben', 4),
    new Course(1003, 'Introduction to Computer science', 'This is a course about computer science', 'Ben', 1),
    new Course(1003, 'Embedded Systems', 'This is a course about arduino and raspberry', 'Ben', 6)
  ];

  constructor() { }

  setCourses(courses: Course[]) {
    this.courses = courses;
    this.coursesChanged.next(this.courses.slice());
  }

  getCourses() {
    return this.courses.slice();
  }

  getCourseById(id) {
    return this.courses[id];
  }

  findCourseNameById(id: number) {
    let courseName = '';
    this.courses.forEach(course => {
      if(course.id === id) {
        courseName = course.name;
      }
    });
    return courseName;
  }
}
