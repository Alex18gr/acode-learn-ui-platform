import { Injectable } from '@angular/core';
import {Resource} from './resource-models/resource.model';
import {CoursesService} from '../courses.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course} from '../course.model';
import {AuthService} from '../../auth/auth.service';
import {map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {fakeAsync} from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  courseResources: ResourceStore = undefined;
  resourcesLoaded = false;
  resourcesLoadedSubject = new Subject<boolean>();
  currentCourseChangedSubscription: Subscription;

  getCourseResources(currentCourse?: Course) {
    let currCourse;
    if (!currentCourse == null) {
      currCourse = currentCourse;
    } else {
      currCourse = this.coursesService.currentCourse;
      if (currCourse == null) { return; }
    }
    this.resourcesLoaded = false;
    this.resourcesLoadedSubject.next(false);
    const courseResourcesUrl = 'http://localhost:8082/spring-security-oauth-resource/course/' + currCourse.id + '/resources';
    return this.getAuthorizedResource(courseResourcesUrl).pipe(
      map((data: any) => {
        this.courseResources = this.getResourceStoreFromData(data);
        console.log(this.courseResources);
        this.resourcesLoaded = true;
        this.resourcesLoadedSubject.next(true);
        return data;
      })
    ).subscribe();
  }

  constructor(private coursesService: CoursesService,
              private httpClient: HttpClient,
              private authService: AuthService) {
    this.init();
  }

  getAuthorizedResource(resourceUrl: string) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + this.authService.currentUser.token
        })
    };

    return this.httpClient.get(resourceUrl, httpOptions);
  }

  private getResourceStoreFromData(resourceData: any) {
    const resourceStore: ResourceStore = new class implements ResourceStore {
      fileResources: Resource[];
      linkResources: Resource[];
      repositoryResources: Resource[];
    };
    for (const resourceDataCatList of resourceData.resources) {
      if (resourceDataCatList.resourcesType === 'RESOURCE_LINK') {
        resourceStore.linkResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_FILE') {
        resourceStore.fileResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_REPOSITORY') {
        resourceStore.repositoryResources = resourceDataCatList.resources;
      }
    }
    return resourceStore;
  }

  private init() {
    this.resourcesLoadedSubject.next(false);
    this.resourcesLoaded = false;
    this.currentCourseChangedSubscription = this.coursesService.currentCourseChanged.subscribe(currentCourse => {
        this.getCourseResources(currentCourse);
      });
    this.getCourseResources(this.coursesService.currentCourse);
  }
}

export interface ResourceStore {
  linkResources: Resource[];
  fileResources: Resource[];
  repositoryResources: Resource[];
}

export interface ResourcesResponse {
  timestamp: string;
  resources: {
    resourceType: string,
    resources: Resource[]
  }[];
}
