import { Component, OnInit, Input } from '@angular/core';
import {Course} from "../../course.model";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {
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
