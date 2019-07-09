import { Component, OnInit, Input } from '@angular/core';
import { Announcement } from 'src/app/course/announcement.model';
import { CoursesService } from 'src/app/course/courses.service';

@Component({
  selector: 'app-home-announcement-list-item',
  templateUrl: './home-announcement-list-item.component.html',
  styleUrls: ['./home-announcement-list-item.component.css']
})
export class HomeAnnouncementListItemComponent implements OnInit {
  @Input() announcement: Announcement;
  private courseTitle;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    if (this.announcement) {
      this.courseTitle = this.coursesService.findCourseNameById(this.announcement.courseId);
    }
  }

}
