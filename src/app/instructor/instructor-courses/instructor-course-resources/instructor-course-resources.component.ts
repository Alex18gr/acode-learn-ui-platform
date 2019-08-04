import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseResources, ResourceService} from '../../resource/resource.service';
import {Resource} from '../../../course/resource/resource-models/resource.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-instructor-course-resources',
  templateUrl: './instructor-course-resources.component.html',
  styleUrls: ['./instructor-course-resources.component.css']
})
export class InstructorCourseResourcesComponent implements OnInit, OnDestroy {
  resources: CourseResources;
  resourcesChanged: Subscription;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourcesChanged = this.resourceService.courseResourcesChangedSubject
      .subscribe((resources: CourseResources) => {
        this.resources = resources;
        console.log(resources);
      });
    this.resources = this.resourceService.courseResources;
  }

  ngOnDestroy(): void {
    if (this.resourcesChanged) {
      this.resourcesChanged.unsubscribe();
    }
  }

}
