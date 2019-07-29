import { Component, OnInit } from '@angular/core';
import {ResourceService, ResourceStore} from '../../resource/resource.service';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resources: ResourceStore = null;

  resourcesLoaded = false;
  // resourcesLoadedSubscription = Subscription;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourcesLoaded = false;
    this.resourceService.getCourseResources();
    this.resourceService.resourcesLoadedSubject.subscribe(data => this.handleResourcesLoaded(data));
    this.resources = this.resourceService.courseResources;
    this.resourcesLoaded = this.resourceService.resourcesLoaded;
    this.handleResourcesLoaded(this.resourcesLoaded);
  }

  private handleResourcesLoaded(resourcesLoaded: boolean) {
    if (!resourcesLoaded) {
      return;
    } else {
      console.log(this.resources);
      this.resourcesLoaded = resourcesLoaded;
      this.resources = this.resourceService.courseResources;
    }
  }
}
