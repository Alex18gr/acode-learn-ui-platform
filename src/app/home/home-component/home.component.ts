import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/course/announcement.model';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  announcements = [
    {courseId: 1001, title: 'This is an important announcement!!!', contents: 'The lesson of monday is canceled!!!',
    professor: 'bob' , timestamp: 1562675143 },
    {courseId: 1001, title: 'Marks are announced', contents: 'Come from my office on monday to get your marks',
    professor: 'tom' , timestamp: 1562025600 },
    {courseId: 1002, title: 'New Task!!!', contents: 'There is a new task with deadline 2 weeks. Check it on the tasks section',
    professor: 'john' , timestamp: 1562544000 },
    {courseId: 1002, title: 'Announcement!!!', contents: 'The lesson of Tuesday is canceled!!!',
    professor: 'alex' , timestamp: 1562284800 },
    {courseId: 1002, title: 'This is an important announcement!!!', contents: 'The exam day is in one month. You can ask in the secretary.',
    professor: 'john' , timestamp: 1562199000 },
    {courseId: 1003, title: 'New Task', contents: 'New task for monday',
    professor: 'bob' , timestamp: 1562371200 },
    {courseId: 1002, title: 'This is an important announcement!!!', contents: 'Professor will not be able to attend to the class tomorrow',
    professor: 'tom' , timestamp: 1562198400 },
    {courseId: 1003, title: 'New Exam Day', contents: 'The exam date is changed!',
    professor: 'bob' , timestamp: 1562457600 },
    {courseId: 1003, title: 'New Book', contents: 'Check the new book at the university bookstore at the 1st floor',
    professor: 'alex' , timestamp: 1561939200 }
  ];

  myAnnouncements = [
    new Announcement(1, 1001, 'This is an important announcement!!!', 'The lesson of monday is canceled!!!',
    'bob', new Date(1562675143000)),
    new Announcement(2, 1001, 'Marks are announced', 'Come from my office on monday to get your marks', 'tom', new Date(1562025600000)),
    new Announcement(3, 1002, 'New Task!!!', 'There is a new task with deadline 2 weeks. Check it on the tasks section',
    'john', new Date(1562544000000)),
    new Announcement(4, 1002, 'Announcement!!!', 'The lesson of Tuesday is canceled!!!', 'alex', new Date(1562284800000)),
    new Announcement(5, 1002, 'This is an important announcement!!!', 'The exam day is in one month. You can ask in the secretary.',
    'john', new Date(1562199000000)),
    new Announcement(6, 1003, 'New Task', 'New task for monday', 'bob', new Date(1562371200000)),
    new Announcement(7, 1002, 'This is an important announcement!!!', 'Professor will not be able to attend to the class tomorrow',
    'tom', new Date(1562198400000)),
    new Announcement(8, 1003, 'New Exam Day', 'The exam date is changed!', 'bob', new Date(1562457600000)),
    new Announcement(9, 1003, 'New Book', 'Check the new book at the university bookstore at the 1st floor',
    'alex', new Date(1561939200000))
  ];

  constructor() { }

  ngOnInit() {
  }

}
