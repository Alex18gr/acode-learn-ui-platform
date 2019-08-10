import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../course.model';
import {CoursesService} from '../courses.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
  // courses = [
  //   {id: 1, name: 'Course 1', professor: 'Professor1', semester: 2, description: 'This is a course description....'},
  //   {id: 2, name: 'Course 2', professor: 'Professor2', semester: 4, description: 'This is a course description....'},
  //   {id: 3, name: 'Course 3', professor: 'Professor3', semester: 3, description: 'This is a course description....'},
  //   {id: 4, name: 'Course 4', professor: 'Professor4', semester: 1, description: 'This is a course description....'},
  //   {id: 5, name: 'Course 5', professor: 'Professor5', semester: 6, description: 'This is a course description....'},
  //   {id: 6, name: 'Course 6', professor: 'Professor6', semester: 5, description: 'This is a course description....'},
  //   {id: 7, name: 'Course 7', professor: 'Professor7', semester: 8, description: 'This is a course description....'}
  // ];

  courses: Course[];
  courseSubscription: Subscription;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    // this.courses = this.coursesService.getCourses();
    this.courseSubscription = this.coursesService.coursesChanged.subscribe((courses: Course[]) => {
      this.courses = courses;
    });
    this.coursesService.getUserCourses().subscribe((coursesData) => {
      console.log(coursesData);
    });
  }

  ngOnDestroy(): void {
  }

}
