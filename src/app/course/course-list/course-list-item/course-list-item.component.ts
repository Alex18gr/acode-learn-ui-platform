import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {
  @Input() course: {id: number, name: string, professor: string, semester: number, description: string};
  constructor() { }

  ngOnInit() {
  }

}
