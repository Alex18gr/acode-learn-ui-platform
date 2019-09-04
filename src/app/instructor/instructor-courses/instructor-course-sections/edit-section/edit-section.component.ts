import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CourseSection} from '../../../../core/models/course-section.model';
import {FormControl, FormGroup} from '@angular/forms';
import {InstructorCoursesService} from '../../../courses/instructor-courses.service';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.css']
})
export class EditSectionComponent implements OnInit, OnChanges {
  @Input() selectedCourseSection: CourseSection;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor(private instructorCourseService: InstructorCoursesService) { }

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
    this.formSubmit.emit(this.form.getRawValue());
  }

  private createForm() {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl('')
    });
  }
}
