import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Course} from '../../../../course/course.model';
import {CourseSection} from '../../../../core/models/course-section.model';
import {Resource} from '../../../../core/models/resource-models/resource.model';
import {ToastService} from '../../../../core/toast/toast.service';
import {InstructorCoursesService} from '../../../courses/instructor-courses.service';

declare var $: any;

@Component({
  selector: 'app-modal-delete-section',
  templateUrl: './modal-delete-section.component.html',
  styleUrls: ['./modal-delete-section.component.css']
})
export class ModalDeleteSectionComponent implements OnInit {
  @ViewChild('deleteSectionModal', {static: false}) deleteModal: ElementRef;
  @Input() currentCourse: Course;
  @Output() deletedSection: EventEmitter<CourseSection> = new EventEmitter<CourseSection>();
  sectionToDelete: CourseSection;
  title = 'Delete Course Section';
  savingChanges = false;
  message = '';

  constructor(private toastService: ToastService,
              private instructorCoursesService: InstructorCoursesService) { }

  ngOnInit() {
  }

  showModal(sectionToDelete: CourseSection) {
    $(this.deleteModal.nativeElement).modal();
    this.sectionToDelete = sectionToDelete;
    this.message = `Are you sure you want to delete course section ${this.sectionToDelete.name}?`;
  }

  hideModal() {
    // in case that the modal is stuck in loading mode
    $(this.deleteModal.nativeElement).modal('hide');
    this.message = '';
  }

  onSaveChanges() {
    this.savingChanges = true;
    this.instructorCoursesService.deleteCourseSection(
      this.sectionToDelete,
      this.currentCourse
    ).subscribe((data: CourseSection) => {
        this.toastService.addSaveToast(
          'Course Section Delete Successful',
          'Course section "' +
          this.sectionToDelete.name + '" deleted successfully.'
        );
        this.savingChanges = false;
        this.deletedSection.emit(data);
        this.hideModal();
      },
      error => {
        this.toastService.addErrorToast(
          'Error',
          'An error occurred while deleting course section "' +
          this.sectionToDelete.name + '".'
        );
        this.savingChanges = false;
      });
  }

}
