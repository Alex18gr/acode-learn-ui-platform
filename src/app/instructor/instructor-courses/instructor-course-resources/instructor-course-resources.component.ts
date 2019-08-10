import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CourseResources, ResourceService} from '../../resource/resource.service';
import {Resource} from '../../../course/resource/resource-models/resource.model';
import {Subscription} from 'rxjs';
import {EditResourceComponent} from '../../edit-resource/edit-resource.component';
import {ResourceTypes} from '../../../course/resource/resource-models/resource-types';
import {Course} from '../../../course/course.model';
import {InstructorCoursesService} from '../../courses/instructor-courses.service';

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

  constructor(private resourceService: ResourceService,
              private instructorCoursesService: InstructorCoursesService) { }

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
    this.editResourcesComponent.openModal(resource);
  }

  resourceTypeChanged(event: Event) {
    this.currentResourceType = (event.target as HTMLSelectElement).value;
  }
}
