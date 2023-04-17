import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import { Course } from '../../../../course/course.model';
import { CourseSection } from '../../../../core/models/course-section.model';
import { ToastService } from '../../../../core/toast/toast.service';
import { InstructorCoursesService } from '../../../courses/instructor-courses.service';
import { Resource } from '../../../../core/models/resource-models/resource.model';

declare var $: any;

@Component({
  selector: 'app-modal-delete-resource',
  templateUrl: './modal-delete-resource.component.html',
  styleUrls: ['./modal-delete-resource.component.css'],
})
export class ModalDeleteResourceComponent implements OnInit {
  @ViewChild('deleteResourceModal', { static: false }) deleteModal: ElementRef;
  @Input() currentCourse: Course;
  @Input() currentCourseSection: CourseSection;
  @Output() deletedResources: EventEmitter<CourseSection> =
    new EventEmitter<CourseSection>();
  deleteResources: Resource[];
  title = 'Delete Resources';
  savingChanges = false;
  message = '';

  constructor(
    private toastService: ToastService,
    private instructorCoursesService: InstructorCoursesService
  ) {}

  ngOnInit() {}

  showModal(deleteResources: Resource[]) {
    $(this.deleteModal.nativeElement).modal();
    this.deleteResources = deleteResources;
    this.createWarningMessage();
  }

  hideModal() {
    // in case that the modal is stuck in loading mode
    $(this.deleteModal.nativeElement).modal('hide');
    this.message = '';
  }

  onSaveChanges() {
    this.savingChanges = true;
    this.instructorCoursesService
      .deleteCourseSectionResources(
        this.currentCourseSection,
        this.currentCourse,
        this.deleteResources
      )
      .subscribe(
        (data: CourseSection) => {
          this.toastService.addSaveToast(
            'Resource Delete Successful',
            'Resources deleted successfully from the course section "' +
              this.currentCourseSection.name +
              '".'
          );
          this.savingChanges = false;
          this.deletedResources.emit(data);
          this.hideModal();
        },
        (error) => {
          this.toastService.addErrorToast(
            'Error',
            'An error occurred while deleting resources from course section "' +
              this.currentCourseSection.name +
              '".'
          );
          this.savingChanges = false;
        }
      );
  }

  createWarningMessage() {
    if (this.deleteResources.length > 1) {
      this.message = '';
      this.message += 'Are you sure you want to delete resources ';
      for (const res of this.deleteResources) {
        this.message += '"' + res.name + '", ';
      }
      this.message += '?';
    } else {
      this.message =
        'Are you sure you want to delete resource "' +
        this.deleteResources[0].name +
        '" ?';
    }
  }
}
