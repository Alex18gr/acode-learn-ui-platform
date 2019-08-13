import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CourseResources, InstructorResourceService} from '../../resource/instructor-resource.service';
import {Resource} from '../../../course/resource/resource-models/resource.model';
import {Subscription} from 'rxjs';
import {EditResourceComponent} from '../../edit-resource/edit-resource.component';
import {ResourceTypes} from '../../../course/resource/resource-models/resource-types';
import {Course} from '../../../course/course.model';
import {InstructorCoursesService} from '../../courses/instructor-courses.service';
import {ToastService} from '../../../core/toast/toast.service';
import {NotificationTypes, ToastActions} from '../../../core/toast/toast.model';

declare var $: any;

@Component({
  selector: 'app-instructor-course-resources',
  templateUrl: './instructor-course-resources.component.html',
  styleUrls: ['./instructor-course-resources.component.css']
})
export class InstructorCourseResourcesComponent implements OnInit, OnDestroy {
  @Input() course: Course;
  resources: CourseResources;
  resourcesChanged: Subscription;
  currentResourceType = 'RESOURCES_ALL';
  resourceTypesListSelect = ResourceTypes.ResourceTypesListSelect;
  @ViewChild('editResourceComponent', {static: false}) editResourcesComponent: EditResourceComponent;

  constructor(private resourceService: InstructorResourceService,
              private instructorCoursesService: InstructorCoursesService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.resourcesChanged = this.resourceService.courseResourcesChangedSubject
      .subscribe((resources: CourseResources) => {
        this.resources = resources;
        this.course = this.instructorCoursesService.currentCourse;
        console.log(resources);
      });
    this.resources = this.resourceService.courseResources;
  }

  ngOnDestroy(): void {
    if (this.resourcesChanged) {
      this.resourcesChanged.unsubscribe();
    }
  }

  onResourceEdit(resource: Resource) {
    this.openModal(resource);
  }

  openModal(resource?: Resource) {
    if (resource) {
      this.editResourcesComponent.openModal(resource.resourceType, resource);
    } else {
      this.editResourcesComponent.openModal(this.currentResourceType);
    }
  }

  resourceTypeChanged(event: Event) {
    this.currentResourceType = (event.target as HTMLSelectElement).value;
  }

  resourceEditFomSubmittedSuccess(evt: { resource: Resource; eventType: string }) {
    switch (evt.eventType) {
      case 'create':
        this.toastService.addToast({
          action: ToastActions.created,
          notificationType: NotificationTypes.info,
          title: 'Resource Added',
          message: 'Resource ' + evt.resource.name + ' added to course ' + this.course.name + '.',
          delay: 5000
        });
        break;
      case 'update':
        this.toastService.addToast({
          action: ToastActions.updated,
          notificationType: NotificationTypes.info,
          title: 'Resource Updated',
          message: 'Resource ' + evt.resource.name + ' updated.',
          delay: 5000
        });
        break;
      case 'delete':
        this.toastService.addToast({
          action: ToastActions.deleted,
          notificationType: NotificationTypes.info,
          title: 'Resource Delete',
          message: 'Resource ' + evt.resource.name + ' deleted.',
          delay: 5000
        });
        break;
    }
  }
}
