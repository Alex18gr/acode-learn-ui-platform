import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../course/course.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-instructor-course-list-item',
  templateUrl: './instructor-course-list-item.component.html',
  styleUrls: ['./instructor-course-list-item.component.css']
})
export class InstructorCourseListItemComponent implements OnInit {

  @Input() course: Course;
  @Input() courseItemIndex;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.course);
  }

  onCourseClicked() {
    this.router.navigate(['/course', this.courseItemIndex], {relativeTo: this.activatedRoute.parent});
  }

}
