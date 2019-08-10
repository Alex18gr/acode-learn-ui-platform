import {Injectable, OnDestroy} from '@angular/core';
import {InstructorCoursesService} from '../courses/instructor-courses.service';
import {Resource} from '../../course/resource/resource-models/resource.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Subject, Subscription} from 'rxjs';
import {Course} from '../../course/course.model';
import {ResourceLink} from '../../course/resource/resource-models/resource-link.model';
import {ResourceFile} from '../../course/resource/resource-models/resource-file.model';
import {ResourceRepository} from '../../course/resource/resource-models/resource-repository.model';
import {ResourceCodeSnippet} from '../../course/resource/resource-models/resource-code-snippet.model';
import {ResourceMarkdown} from '../../course/resource/resource-models/resource-markdown.model';
import {ResourceGuide} from '../../course/resource/resource-models/resource-guide.model';

export interface CourseResources {
  linkResources: ResourceLink[];
  fileResources: ResourceFile[];
  repositoryResources: ResourceRepository[];
  codeSnippetResources: ResourceCodeSnippet[];
  markdownDocumentResources: ResourceMarkdown[];
  guideResources: ResourceGuide[];
}

export enum ResourceLoadingStatus {
  pending,
  loading,
  loaded,
  failed
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService implements OnDestroy {
  courseResources: CourseResources;
  resourcesLoadingStatus = ResourceLoadingStatus.pending;
  currentCourseUpdatedSubscription: Subscription;
  private courseResourcesChanged: Subject<CourseResources>;
  get courseResourcesChangedSubject() {
    if (!this.courseResourcesChanged) {
      this.courseResourcesChanged = new Subject<CourseResources>();
    }
    return this.courseResourcesChanged;
  }

  constructor(private instructorCoursesService: InstructorCoursesService,
              private httpClient: HttpClient,
              private authService: AuthService) {
    this.init();
  }

  private init() {
    this.currentCourseUpdatedSubscription = this.instructorCoursesService
      .currentCourseChanged.subscribe((course: Course) => {
        this.resourcesLoadingStatus = ResourceLoadingStatus.loading;
        this.getCourseResources(course);
      });
    if (this.instructorCoursesService.currentCourse) {
      this.getCourseResources(this.instructorCoursesService.currentCourse);
    }
  }

  ngOnDestroy(): void {
    if (this.currentCourseUpdatedSubscription) {
      this.currentCourseUpdatedSubscription.unsubscribe();
    }
  }

  private getCourseResources(course: Course) {
    const courseResourcesUrl = 'http://localhost:8082/spring-security-oauth-resource/course/'
      + course.id + '/resources-all';
    this.getAuthorizedResource(courseResourcesUrl).subscribe((data: any) => {
      // console.log(data);
      // const resources = this.getResourceStoreFromData(data);
      this.resourcesLoadingStatus = ResourceLoadingStatus.loaded;
      this.courseResources = data.resources;
      this.courseResourcesChanged.next(this.courseResources);
    });
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
    // tslint:disable-next-line:new-parens
    const resourceStore: CourseResources = new class implements CourseResources {
      linkResources: ResourceLink[];
      fileResources: ResourceFile[];
      repositoryResources: ResourceRepository[];
      codeSnippetResources: ResourceCodeSnippet[];
      markdownDocumentResources: ResourceMarkdown[];
      guideResources: ResourceGuide[];
    };

    for (const resourceDataCatList of resourceData.resources) {
      if (resourceDataCatList.resourcesType === 'RESOURCE_LINK') {
        resourceStore.linkResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_FILE') {
        resourceStore.fileResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_REPOSITORY') {
        resourceStore.repositoryResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_CODE_SNIPPET') {
        resourceStore.codeSnippetResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_MARKDOWN') {
        resourceStore.markdownDocumentResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_GUIDE') {
        resourceStore.guideResources = resourceDataCatList.resources;
      }
    }
    return resourceStore;
  }

  downloadFile(fileResource: ResourceFile) {
    const fileUrl = 'http://localhost:8082/spring-security-oauth-resource/course/' +
      this.instructorCoursesService.currentCourse.id + '/resource/' + fileResource.resourceId;
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.currentUser.token);
    this.httpClient.get(fileUrl, {
      headers,
      responseType: 'arraybuffer'
    }).subscribe((res: any) => {
      // console.log(res);
      // console.log(btoa(res));
      const blobData = new Blob([res], {type: fileResource.fileType});
      const fileData = new File([blobData], fileResource.fileName, {type: fileResource.fileType});
      console.log(fileData);
      const url = window.URL.createObjectURL(fileData);
      console.log(url);
      const pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
      }
    });
  }
}
