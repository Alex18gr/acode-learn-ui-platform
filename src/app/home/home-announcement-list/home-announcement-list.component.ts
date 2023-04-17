import { Component, OnInit, Input } from '@angular/core';
import { Announcement } from 'src/app/course/announcement.model';
import { CoursesService } from 'src/app/course/courses.service';

@Component({
  selector: 'app-home-announcement-list',
  templateUrl: './home-announcement-list.component.html',
  styleUrls: ['./home-announcement-list.component.css'],
})
export class HomeAnnouncementListComponent implements OnInit {
  @Input() announcements: Announcement[];
  viewedAnnouncements: Announcement[];

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.manipulateAnnouncementsList();
  }

  private manipulateAnnouncementsList() {
    // sort the list of the announcements by the timestamp
    this.announcements.sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
    );

    // we will get only the 5 newest announcements
    if (this.announcements.length > 5) {
      this.viewedAnnouncements = this.announcements.slice(0, 5);
    } else {
      this.viewedAnnouncements = this.announcements;
    }
  }
}
