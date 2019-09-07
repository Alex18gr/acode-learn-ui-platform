import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CourseSection} from '../../../../core/models/course-section.model';
import {FormControl, FormGroup} from '@angular/forms';
import {InstructorCoursesService} from '../../../courses/instructor-courses.service';
import * as _ from 'lodash';
import {Course} from '../../../../course/course.model';
import {ToastService} from '../../../../core/toast/toast.service';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.css']
})
export class EditSectionComponent implements OnInit, OnChanges {
  @Input() currentCourse: Course;
  @Input() selectedCourseSection: CourseSection;
  @Output() courseSectionSaved: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  savingData = false;

  constructor(
    private instructorCourseService: InstructorCoursesService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedCourseSection && changes.selectedCourseSection.currentValue &&
      (changes.selectedCourseSection.currentValue !== changes.selectedCourseSection.previousValue)) {
        if (!this.form) {
          this.createForm();
        }
        this.form.setValue({
          name: this.selectedCourseSection.name,
          description: this.selectedCourseSection.description
        });
    }
  }

  onFormSubmit() {
    this.saveCourseSection();
  }

  onFormReset() {
    if (this.form && this.selectedCourseSection) {
      this.form.setValue({
        name: this.selectedCourseSection.name,
        description: this.selectedCourseSection.description
      });
    }
  }

  private createForm() {
    this.form = new FormGroup({
      name: new FormControl({disabled: this.savingData}),
      description: new FormControl({disabled: this.savingData})
    });
  }

  saveCourseSection() {
    const courseSectionToSave: CourseSection = _.cloneDeep(this.selectedCourseSection);
    const formValue = this.form.getRawValue();
    courseSectionToSave.resources = undefined;
    courseSectionToSave.name = formValue.name;
    courseSectionToSave.description = formValue.description;

    this.savingData = true;
    this.instructorCourseService.updateCourseSection(
      courseSectionToSave,
      this.currentCourse
    ).subscribe((data: CourseSection) => {
      this.courseSectionSaved.emit(this.form.getRawValue());
      this.toastService.addSaveToast(
        'Course Section Updated',
        'Course Section "' + data.name +
        '" updated successfully.'
      );
      this.savingData = false;
    },
      error => {
        this.toastService.addErrorToast(
          'Update Error',
          'An error occurred while updating course section'
        );
        this.savingData = false;
      });
  }
}
