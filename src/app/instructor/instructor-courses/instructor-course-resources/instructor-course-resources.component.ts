import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CourseResources,
  InstructorResourceService,
} from '../../resource/instructor-resource.service';
import { Resource } from '../../../core/models/resource-models/resource.model';
import { Subscription } from 'rxjs';
import { EditResourceComponent } from '../../edit-resource/edit-resource.component';
import { ResourceTypes } from '../../../core/models/resource-models/resource-types';
import { Course } from '../../../course/course.model';
import { InstructorCoursesService } from '../../courses/instructor-courses.service';
import { ToastService } from '../../../core/toast/toast.service';
import {
  NotificationTypes,
  ToastActions,
} from '../../../core/toast/toast.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteResourceComponent } from '../../delete-resource/delete-resource.component';

declare var $: any;

@Component({
  selector: 'app-instructor-course-resources',
  templateUrl: './instructor-course-resources.component.html',
  styleUrls: ['./instructor-course-resources.component.css'],
})
export class InstructorCourseResourcesComponent
  implements OnInit, OnDestroy, AfterViewChecked, AfterContentChecked
{
  @Input() course: Course;
  resources: CourseResources;
  resourcesInitialized: Subscription;
  resourcesChanged: Subscription;
  currentResourceType = 'RESOURCES_ALL';
  resourceTypesListSelect = ResourceTypes.ResourceTypesListSelect;
  queryParamsSubscription: Subscription;
  isLoading = false;
  @ViewChild('editResourceComponent', { static: false })
  editResourcesComponent: EditResourceComponent;
  @ViewChild('deleteResourceComponent', { static: false })
  deleteResourceComponent: DeleteResourceComponent;
  @ViewChild('selectResourceType', { static: false })
  selectResourceType: HTMLSelectElement;

  constructor(
    private resourceService: InstructorResourceService,
    private instructorCoursesService: InstructorCoursesService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {}

  ngAfterContentChecked(): void {
    this.queryParamsSubscription = this.route.queryParamMap.subscribe(
      (params) => {
        if (
          params.get('resType') &&
          ResourceTypes.ResourceTypeExists(params.get('resType'))
        ) {
          // this.selectResourceType.selectedIndex = this.findSelectedIndex(params.get('resType'));
          this.currentResourceType = params.get('resType');
        }
      }
    );
  }

  private findSelectedIndex(resType: string) {
    for (const t of ResourceTypes.ResourceTypesListSelect) {
      if (t.value === resType) {
        return ResourceTypes.ResourceTypesListSelect.indexOf(t);
      }
    }
    return -1;
  }

  getResources() {
    if (this.resourcesInitialized) {
      this.resourcesInitialized.unsubscribe();
    }
    this.isLoading = true;
    this.resourcesInitialized = this.resourceService
      .getCourseResources()
      .subscribe(
        (resources: CourseResources) => {
          this.resources = resources;
          this.isLoading = false;
          this.course = this.instructorCoursesService.currentCourse;
          console.log(resources);
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  ngOnInit() {
    this.getResources();
    this.resourcesChanged =
      this.resourceService.courseResourcesChangedSubject.subscribe(
        (resources: CourseResources) => {
          this.resources = resources;
          this.isLoading = false;
        }
      );
    this.resources = this.resourceService.courseResources;
  }

  ngOnDestroy(): void {
    if (this.resourcesChanged) {
      this.resourcesChanged.unsubscribe();
    }
    if (this.resourcesInitialized) {
      this.resourcesInitialized.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  onResourceDelete(resource: Resource) {
    this.openDeleteModal(resource);
  }

  openDeleteModal(resource: Resource) {
    this.deleteResourceComponent.openModal(resource);
  }

  onResourceEdit(resource: Resource) {
    this.openEditModal(resource);
  }

  openEditModal(resource?: Resource) {
    if (this.currentResourceType === 'RESOURCES_ALL') {
      return;
    }
    if (resource) {
      this.editResourcesComponent.openModal(resource.resourceType, resource);
    } else {
      this.editResourcesComponent.openModal(this.currentResourceType);
    }
  }

  resourceTypeChanged(event: Event) {
    this.currentResourceType = (event.target as HTMLSelectElement).value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        resType: this.currentResourceType,
      },
    });
  }

  resourceEditFomSubmittedSuccess(evt: {
    resource: Resource;
    eventType: string;
  }) {
    switch (evt.eventType) {
      case 'create':
        this.toastService.addToast({
          action: ToastActions.created,
          notificationType: NotificationTypes.info,
          title: 'Resource Added',
          message:
            'Resource ' +
            evt.resource.name +
            ' added to course ' +
            this.course.name +
            '.',
          delay: 5000,
        });
        break;
      case 'update':
        this.toastService.addToast({
          action: ToastActions.updated,
          notificationType: NotificationTypes.info,
          title: 'Resource Updated',
          message: 'Resource ' + evt.resource.name + ' updated.',
          delay: 5000,
        });
        break;
      case 'delete':
        this.toastService.addToast({
          action: ToastActions.deleted,
          notificationType: NotificationTypes.info,
          title: 'Resource Delete',
          message: 'Resource ' + evt.resource.name + ' deleted.',
          delay: 5000,
        });
        break;
    }
    this.getResources();
  }

  resourceDeleteSuccess($event: Resource) {
    this.getResources();
  }
}
