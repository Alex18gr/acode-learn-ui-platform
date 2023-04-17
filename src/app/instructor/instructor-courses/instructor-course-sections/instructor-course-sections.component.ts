import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { InstructorCoursesService } from '../../courses/instructor-courses.service';
import { Course } from '../../../course/course.model';
import { Subscription } from 'rxjs';
import { CourseSection } from '../../../core/models/course-section.model';
import { ModalAddResourceComponent } from './modal-add-resource/modal-add-resource.component';
import { Resource } from '../../../core/models/resource-models/resource.model';
import * as _ from 'lodash';
import { ToastService } from '../../../core/toast/toast.service';
import { ModalDeleteResourceComponent } from './modal-delete-resource/modal-delete-resource.component';
import { ModalNewSectionComponent } from './modal-new-section/modal-new-section.component';
import { ModalDeleteSectionComponent } from './modal-delete-section/modal-delete-section.component';

@Component({
  selector: 'app-instructor-course-sections',
  templateUrl: './instructor-course-sections.component.html',
  styleUrls: ['./instructor-course-sections.component.css'],
})
export class InstructorCourseSectionsComponent implements OnInit, OnDestroy {
  @ViewChild('listElement', { static: false }) listElementRef: ElementRef;
  @ViewChild('modalAddResource', { static: false })
  modalAddResource: ModalAddResourceComponent;
  @ViewChild('modalDeleteResources', { static: false })
  modalDeleteResources: ModalDeleteResourceComponent;
  @ViewChild('modalNewSectionComponent', { static: false })
  modalNewSectionComponent: ModalNewSectionComponent;
  @ViewChild('modalDeleteSectionComponent', { static: false })
  modalDeleteSectionComponent: ModalDeleteSectionComponent;
  currentCourse: Course;
  currentCourseSubscription: Subscription;
  editMode = false;
  editListMode = false;
  courseSectionsList: CourseSection[];
  tempCourseSectionsList: CourseSection[];
  selectedCourseSection: CourseSection;
  savingData = false;
  savingOrderData = false;

  constructor(
    private renderer: Renderer2,
    private instructorCoursesService: InstructorCoursesService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.currentCourse = this.instructorCoursesService.currentCourse;
    this.getCourseSections();
    this.currentCourseSubscription =
      this.instructorCoursesService.currentCourseChanged.subscribe(
        (course: Course) => {
          this.currentCourse = course;
          this.getCourseSections();
        }
      );
  }

  getCourseSections() {
    if (this.currentCourse) {
      this.instructorCoursesService
        .getCourseSections(this.currentCourse)
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
            }
          );
          this.courseSectionsList =
            courseSections as unknown as CourseSection[];
        });
    }
  }

  ngOnDestroy(): void {
    if (this.currentCourseSubscription) {
      this.currentCourseSubscription.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.courseSectionsList,
      event.previousIndex,
      event.currentIndex
    );
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
      this.copyTempResourcesList();
      this.editListMode = true;
    } else {
      this.editListMode = false;
      this.courseSectionsList = this.tempCourseSectionsList;
      this.tempCourseSectionsList = undefined;
    }
  }
  copyTempResourcesList() {
    this.tempCourseSectionsList = _.cloneDeep(this.courseSectionsList);
  }

  onDeleteResource(res: Resource) {
    // here we delete the resource
    this.modalDeleteResources.showModal([res]);
  }

  onAddNewResource() {
    this.modalAddResource.showModal();
  }

  onCourseSectionSaved(data: any) {
    this.getCourseSections();
  }

  onSaveOrderChanges() {
    this.savingOrderData = true;
    for (const cs of this.courseSectionsList) {
      cs.order = this.courseSectionsList.indexOf(cs) + 1;
    }

    this.instructorCoursesService
      .updateCourseSectionsOrder(this.courseSectionsList, this.currentCourse)
      .subscribe(
        (data: CourseSection[]) => {
          this.tempCourseSectionsList = data;
          this.courseSectionsList = this.tempCourseSectionsList;
          this.toastService.addSaveToast(
            'Order Updated',
            'Course sections order updated successfully.'
          );
          this.savingOrderData = false;
        },
        (error) => {
          this.toastService.addErrorToast(
            'Error',
            'An error occurred while updating the course sections order.'
          );
        }
      );
    this.savingOrderData = false;
  }

  onChangedData() {
    this.getCourseSections();
  }

  openNewSectionModal(courseSection?: CourseSection) {
    this.modalNewSectionComponent.showModal(courseSection);
  }

  openDeleteSectionModal(courseSection: CourseSection) {
    this.modalDeleteSectionComponent.showModal(courseSection);
  }
}
