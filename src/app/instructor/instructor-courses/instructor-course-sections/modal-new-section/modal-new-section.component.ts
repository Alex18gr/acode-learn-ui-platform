import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Course} from '../../../../course/course.model';
import {CourseSection} from '../../../../core/models/course-section.model';
import * as _ from 'lodash';
import {ToastService} from '../../../../core/toast/toast.service';
import {InstructorCoursesService} from '../../../courses/instructor-courses.service';
import {Resource} from '../../../../core/models/resource-models/resource.model';
import {FormControl, FormGroup} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-modal-new-section',
  templateUrl: './modal-new-section.component.html',
  styleUrls: ['./modal-new-section.component.css']
})
export class ModalNewSectionComponent implements OnInit {
  @ViewChild('editSectionModal', {static: false}) deleteModal: ElementRef;
  @Input() currentCourse: Course;
  @Output() editedCourseSection: EventEmitter<CourseSection> = new EventEmitter<CourseSection>();
  editingCourseSection: CourseSection;
  title = 'New Course Section';
  savingChanges = false;
  editMode = false;
  form: FormGroup;

  constructor(private toastService: ToastService,
              private instructorCoursesService: InstructorCoursesService) { }

  ngOnInit() {
    this.createForm();
  }

  showModal(editingCourseSection?: CourseSection) {
    this.resetModal();
    $(this.deleteModal.nativeElement).modal();
    if (!this.form) {
      this.createForm();
    }
    if (editingCourseSection) {
      this.editingCourseSection = editingCourseSection;
      this.editMode = true;
      this.title = 'Editing Resource';
      this.form.setValue({
        name: this.editingCourseSection.name,
        description: this.editingCourseSection.description
      });
    }
  }

  resetModal() {
    this.editMode = false;
    this.title = 'New Course Section';
    this.editingCourseSection = undefined;
    this.clearForm();
  }

  hideModal() {
    // in case that the modal is stuck in loading mode
    $(this.deleteModal.nativeElement).modal('hide');
    this.resetModal();
  }

  onSaveChanges() {
    const formValue = this.form.getRawValue();
    if (this.editMode) {
      this.editingCourseSection.name = formValue.name;
      this.editingCourseSection.description = formValue.description;

      this.instructorCoursesService.updateCourseSection(
        this.editingCourseSection,
        this.currentCourse
      ).subscribe((data: CourseSection) => {
          this.editedCourseSection.emit(data);
          this.toastService.addSaveToast(
            'Course Section Updated',
            'Course Section "' + data.name +
            '" updated successfully.'
          );
          this.savingChanges = false;
          this.hideModal();
        },
        error => {
          this.toastService.addErrorToast(
            'Update Error',
            'An error occurred while updating course section'
          );
          this.savingChanges = false;
        });
    } else {
      const tempCourseSection = new CourseSection();
      tempCourseSection.name = formValue.name;
      tempCourseSection.description = formValue.description;
      tempCourseSection.order = -1;
      tempCourseSection.dateCreated = new Date();
      tempCourseSection.course = this.currentCourse;
      this.savingChanges = true;

      this.instructorCoursesService.createCourseSection(
        tempCourseSection,
        this.currentCourse
      ).subscribe((data: CourseSection) => {
        this.editedCourseSection.emit(data);
        this.toastService.addSaveToast(
          'Course Section Created',
          'Course Section "' + data.name +
          '" created successfully.'
        );
        this.savingChanges = false;
        this.hideModal();
      },
      error => {
        this.toastService.addErrorToast(
          'Update Error',
          'An error occurred while creating course section'
        );
        this.savingChanges = false;
      });
    }
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl('')
    });
  }

  private clearForm() {
    if (this.form) {
      this.form.setValue({
        name: '',
        description: ''
      });
    }
  }
}
