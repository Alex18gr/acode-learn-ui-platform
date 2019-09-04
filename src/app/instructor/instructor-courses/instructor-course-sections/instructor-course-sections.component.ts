import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {InstructorCoursesService} from '../../courses/instructor-courses.service';
import {Course} from '../../../course/course.model';
import {Subscription} from 'rxjs';
import {CourseSection} from '../../../core/models/course-section.model';
import {ModalAddResourceComponent} from './modal-add-resource/modal-add-resource.component';
import {Resource} from '../../../core/models/resource-models/resource.model';

@Component({
  selector: 'app-instructor-course-sections',
  templateUrl: './instructor-course-sections.component.html',
  styleUrls: ['./instructor-course-sections.component.css']
})
export class InstructorCourseSectionsComponent implements OnInit, OnDestroy {
  @ViewChild('listElement', {static: false}) listElementRef: ElementRef;
  @ViewChild('modalAddResource', {static: false}) modalAddResource: ModalAddResourceComponent;
  currentCourse: Course;
  currentCourseSubscription: Subscription;
  editMode = false;
  editListMode = false;
  courseSectionsList: CourseSection[];
  selectedCourseSection: CourseSection;

  constructor(private renderer: Renderer2,
              private coursesService: InstructorCoursesService) { }

  ngOnInit() {
    this.currentCourse = this.coursesService.currentCourse;
    this.getCourseSections();
    this.currentCourseSubscription = this.coursesService.currentCourseChanged.subscribe(
      (course: Course) => {
        this.currentCourse = course;
        this.getCourseSections();
      }
    );
  }

  getCourseSections() {
    if (this.currentCourse) {
      this.coursesService.getCourseSections(this.currentCourse)
        .subscribe((courseSections) => {
          (courseSections as unknown as CourseSection[]).sort(
            (a: CourseSection, b: CourseSection) => {
            if (a.order < b.order) {
              return -1;
            } else if (a.order > b.order) {
              return 1;
            } else {
              return 0;
            }
          });
          this.courseSectionsList = courseSections as unknown as CourseSection[];
        });
    }
  }

  ngOnDestroy(): void {
    if (this.currentCourseSubscription) {
      this.currentCourseSubscription.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.courseSectionsList, event.previousIndex, event.currentIndex);
  }

  onListItemClick(event: MouseEvent, courseSection: CourseSection) {
    if (!this.editListMode) {
      if ((event.target as any).classList.contains('selected-list-item')) {
        this.renderer.removeClass(event.target, 'selected-list-item');
        this.removeSelection();
        this.selectedCourseSection = undefined;
      } else {
        this.removeSelection();
        this.renderer.addClass(event.target, 'selected-list-item');
        this.selectedCourseSection = courseSection;
      }
    }
  }

  private removeSelection() {
    for (const child of this.listElementRef.nativeElement.children) {
      this.renderer.removeClass(child, 'selected-list-item');
    }
    this.selectedCourseSection = null;
  }

  triggerListEditMode() {
    if (!this.editListMode) {
      this.removeSelection();
      this.editListMode = true;
    } else {
      this.editListMode = false;
    }
  }

  onDeleteResource(res: Resource) {
    // here we delete the resource
  }

  onAddNewResource() {
    this.modalAddResource.showModal();
  }

  onCourseSectionSaved(data: any) {
    this.getCourseSections();
  }
}
