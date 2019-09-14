import {Component, Input, OnInit, OnDestroy, HostListener, ViewChild, ElementRef} from '@angular/core';
import {Course} from '../course.model';
import { CoursesService } from '../courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-navbar',
  templateUrl: './course-navbar.component.html',
  styleUrls: ['./course-navbar.component.css']
})
export class CourseNavbarComponent implements OnInit, OnDestroy {
  @Input() course: Course; // = new Course(-1, '', '', '', -1, []);
  @Input() courseIndex: any;
  @Input() courses: Course[] = [];
  @Input() dataLoaded: boolean;
  @ViewChild('navbar', {static: false}) navbarElementRef: ElementRef;

  coursesChanged: Subscription;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    // this.courses = this.coursesService.userCourses;
    // this.coursesChanged = this.coursesService.coursesChanged.subscribe((courses: Course[]) => {
    //   this.courses = courses;
    // });
    // this.courses = this.coursesService.userCourses;
    // this.courses = this.coursesService.userCourses;
  }

  // getCourses() {
  //   this.courses = this.coursesService.getCourses();
  //   if (this.courseIndex > -1) {
  //     this.courses.splice(this.courseIndex, 1);
  //   }
  // }

  ngOnDestroy() {
    // this.coursesChanged.unsubscribe();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    const sticky = this.navbarElementRef.nativeElement.offsetTop;
    if (window.pageYOffset >= sticky) {
      this.navbarElementRef.nativeElement.classList.add('sticky');
    } else {
      this.navbarElementRef.nativeElement.classList.remove('sticky');
    }
  }

}
