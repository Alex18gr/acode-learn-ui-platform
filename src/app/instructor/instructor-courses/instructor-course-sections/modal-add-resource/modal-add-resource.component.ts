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
import { ResourceTypes } from '../../../../core/models/resource-models/resource-types';
import {
  CourseResources,
  InstructorResourceService,
} from '../../../resource/instructor-resource.service';
import { ToastService } from '../../../../core/toast/toast.service';
import {
  DynamicGuideService,
  GuideDataResource,
} from '../../../../core/dynamic-guide/dynamic-guide.service';
import { Resource } from '../../../../core/models/resource-models/resource.model';
import { ResourceStore } from '../../../../course/resource/resource.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { InstructorCoursesService } from '../../../courses/instructor-courses.service';
import { CourseSection } from '../../../../core/models/course-section.model';
import { Course } from '../../../../course/course.model';

declare var $: any;

@Component({
  selector: 'app-modal-add-resource',
  templateUrl: './modal-add-resource.component.html',
  styleUrls: ['./modal-add-resource.component.css'],
})
export class ModalAddResourceComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ElementRef;
  @ViewChild('resTypeSelect', { static: false }) typeSelect: HTMLSelectElement;
  @ViewChild('addResourcesDragDrop', { static: false })
  addResourcesDragDrop: any;
  @Input() currentCourse: Course;
  @Input() currentCourseSection: CourseSection;
  @Output() savedResources: EventEmitter<CourseSection> =
    new EventEmitter<CourseSection>();
  title = 'Add Resource';
  resourceTypesSelect = ResourceTypes.ResourceTypesListSelect;
  addResourcesLoading = false;
  resourcesList: Resource[] = [];
  addResourcesList: Resource[];
  savingChanges = false;

  constructor(
    private resourceService: InstructorResourceService,
    private toastService: ToastService,
    private instructorCoursesService: InstructorCoursesService
  ) {}

  ngOnInit() {}

  showModal() {
    $(this.editModal.nativeElement).modal();
    this.resourcesList = [];
  }

  openModal() {}

  hideModal() {
    // in case that the modal is stuck in loading mode
    $(this.editModal.nativeElement).modal('hide');
  }

  onAddResourcesTypeSelectChange(value: any) {
    this.addResourcesLoading = true;
    this.resourceService
      .getAllCourseResources(this.currentCourse.id, value)
      .subscribe((data: any) => {
        console.log(data);
        this.addResourcesList =
          this.resourceService.getResourceListByResourceType(
            data.resources,
            value
          );
        this.addResourcesLoading = false;
      });
  }

  drop(event: CdkDragDrop<Resource[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onSaveChanges() {
    this.savingChanges = true;
    this.instructorCoursesService
      .createCourseSectionResources(
        this.currentCourseSection,
        this.currentCourse,
        this.resourcesList
      )
      .subscribe(
        (data: CourseSection) => {
          this.toastService.addSaveToast(
            'Course Section Resources saved',
            'Added ' +
              this.resourcesList.length +
              'new resources in course section "' +
              this.currentCourseSection.name +
              '" successfully'
          );
          this.savingChanges = false;
          this.savedResources.emit(data);
          this.hideModal();
        },
        (error) => {
          this.toastService.addErrorToast(
            'Error',
            'An error occurred while saving new resources to course section "' +
              this.currentCourseSection.name +
              '" '
          );
          this.savingChanges = false;
        }
      );
  }
}
