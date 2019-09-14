import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ResourceService, ResourceStore} from '../../resource/resource.service';
import {Subject, Subscription} from 'rxjs';
import {CourseResources} from '../../../instructor/resource/instructor-resource.service';
import {CoursesService} from '../../courses.service';
import {Course} from '../../course.model';
import {ResourceTypes} from '../../../core/models/resource-models/resource-types';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {
  resources: CourseResources;
  resourcesLoaded = false;
  courseChanged: Subscription;
  currentCourse: Course;
  currentResourceType = 'RESOURCES_ALL';
  resourceTypesListSelect = ResourceTypes.ResourceTypesListSelect;
  @ViewChild('selectResourceType', {static: false}) selectResourceType: HTMLSelectElement;

  constructor(private resourceService: ResourceService,
              private coursesService: CoursesService) { }

  ngOnInit() {
    this.currentCourse = this.coursesService.currentCourse;
    this.courseChanged = this.coursesService.currentCourseChanged
      .subscribe((course: Course) => {
        this.currentCourse = course;
        this.getResources();
      });
    this.getResources();
  }

  ngOnDestroy(): void {
    if (this.courseChanged) {
      this.courseChanged.unsubscribe();
    }
  }

  resourceTypeChanged(event: Event) {
    this.currentResourceType = (event.target as HTMLSelectElement).value;
  }

  getResources() {
    if (this.currentCourse) {
      this.resourceService.getAllCourseResources(this.currentCourse.id)
        .subscribe((data: {resources: CourseResources}) => {
          this.resources = data.resources;
        });
    }
  }

  // private handleResourcesLoaded(resourcesLoaded: boolean) {
  //   if (!resourcesLoaded) {
  //     return;
  //   } else {
  //     console.log(this.resources);
  //     this.resourcesLoaded = resourcesLoaded;
  //     this.resources = this.resourceService.courseResources;
  //   }
  // }
}
