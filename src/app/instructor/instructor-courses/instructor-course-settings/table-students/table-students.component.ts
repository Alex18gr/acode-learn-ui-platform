import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { InstructorCoursesService } from '../../../courses/instructor-courses.service';
import { Course } from '../../../../course/course.model';
import { UserStudent } from '../../../../core/models/user-student';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.css'],
})
export class TableStudentsComponent implements OnInit, OnChanges {
  @Input() currentCourse: Course;
  enrolledStudents: UserStudent[];

  constructor(private instructorCoursesService: InstructorCoursesService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes.currentCourse &&
      changes.currentCourse.previousValue !== changes.currentCourse.currentValue
    ) {
      this.getEnrolledStudents();
    }
  }

  private getEnrolledStudents() {
    this.instructorCoursesService
      .getCourseEnrolledStudents(this.currentCourse)
      .subscribe((students: UserStudent[]) => {
        this.enrolledStudents = students;
      });
  }
}
