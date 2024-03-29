import { Injectable, OnDestroy } from '@angular/core';
import { InstructorCoursesService } from '../courses/instructor-courses.service';
import { Resource } from '../../core/models/resource-models/resource.model';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Subject, Subscription } from 'rxjs';
import { Course } from '../../course/course.model';
import { ResourceLink } from '../../core/models/resource-models/resource-link.model';
import { ResourceFile } from '../../core/models/resource-models/resource-file.model';
import { ResourceRepository } from '../../core/models/resource-models/resource-repository.model';
import { ResourceCodeSnippet } from '../../core/models/resource-models/resource-code-snippet.model';
import { ResourceMarkdown } from '../../core/models/resource-models/resource-markdown.model';
import { ResourceGuide } from '../../core/models/resource-models/resource-guide.model';
import { map } from 'rxjs/operators';
import { ResourceTypes } from '../../core/models/resource-models/resource-types';

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
  failed,
}

@Injectable({
  providedIn: 'root',
})
export class InstructorResourceService implements OnDestroy {
  courseResources: CourseResources;
  resourcesLoadingStatus = ResourceLoadingStatus.pending;
  currentCourseUpdatedSubscription: Subscription;
  codeSnippetLanguageOptions = [
    { value: '', key: '' },
    { value: 'text/x-java', key: 'Java' },
    { value: 'javascript', key: 'Javascript' },
    { value: 'clike', key: 'C/C++' },
    { value: 'python', key: 'Python' },
    { value: 'php', key: 'PHP' },
    { value: 'htmlmixed', key: 'HTML-mixed' },
    { value: 'markdown', key: 'Markdown' },
  ];
  private courseResourcesChanged: Subject<CourseResources> =
    new Subject<CourseResources>();
  get courseResourcesChangedSubject() {
    return this.courseResourcesChanged;
  }

  constructor(
    private instructorCoursesService: InstructorCoursesService,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.init();
  }

  private init() {
    this.currentCourseUpdatedSubscription =
      this.instructorCoursesService.currentCourseChanged.subscribe(
        (course: Course) => {
          this.resourcesLoadingStatus = ResourceLoadingStatus.loading;
          this.getCourseResources(course);
        }
      );
    if (this.instructorCoursesService.currentCourse) {
      this.getCourseResources(this.instructorCoursesService.currentCourse);
    }
  }

  ngOnDestroy(): void {
    if (this.currentCourseUpdatedSubscription) {
      this.currentCourseUpdatedSubscription.unsubscribe();
    }
  }

  getCourseResources(course?: Course) {
    if (!course) {
      course = this.instructorCoursesService.currentCourse;
    }
    const courseResourcesUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      course.id +
      '/resources-all';
    return this.getAuthorizedResource(courseResourcesUrl).pipe(
      map((data: any) => {
        // console.log(data);
        // const resources = this.getResourceStoreFromData(data);
        this.resourcesLoadingStatus = ResourceLoadingStatus.loaded;
        this.courseResources = data.resources;
        this.courseResourcesChanged.next(this.courseResources);
        return this.courseResources;
      })
    );
  }

  getResourcesFromCourseResources(cResources: CourseResources) {
    const resources: Resource[] = cResources.linkResources.concat(
      (cResources.repositoryResources as any).concat(
        cResources.markdownDocumentResources.concat(
          (cResources.codeSnippetResources as any).concat(
            cResources.fileResources.concat(cResources.guideResources as any)
          )
        )
      )
    );
    return resources;
  }

  getAuthorizedResource(resourceUrl: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Bearer ' + this.authService.currentUser.token,
      }),
    };

    return this.httpClient.get(resourceUrl, httpOptions);
  }

  private getResourceStoreFromData(resourceData: any) {
    // tslint:disable-next-line:new-parens
    const resourceStore: CourseResources = new (class
      implements CourseResources
    {
      linkResources: ResourceLink[];
      fileResources: ResourceFile[];
      repositoryResources: ResourceRepository[];
      codeSnippetResources: ResourceCodeSnippet[];
      markdownDocumentResources: ResourceMarkdown[];
      guideResources: ResourceGuide[];
    })();

    for (const resourceDataCatList of resourceData.resources) {
      if (resourceDataCatList.resourcesType === 'RESOURCE_LINK') {
        resourceStore.linkResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_FILE') {
        resourceStore.fileResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_REPOSITORY') {
        resourceStore.repositoryResources = resourceDataCatList.resources;
      } else if (
        resourceDataCatList.resourcesType === 'RESOURCE_CODE_SNIPPET'
      ) {
        resourceStore.codeSnippetResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_MARKDOWN') {
        resourceStore.markdownDocumentResources = resourceDataCatList.resources;
      } else if (resourceDataCatList.resourcesType === 'RESOURCE_GUIDE') {
        resourceStore.guideResources = resourceDataCatList.resources;
      }
    }
    return resourceStore;
  }

  createFileResourceRequest(resource: ResourceFile, fileData: Blob) {
    const fileUploadUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      this.instructorCoursesService.currentCourse.id +
      '/resource/file';
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    const formData = new FormData();
    formData.append('file', fileData);
    formData.append('resource', JSON.stringify(resource));
    // return this.httpClient.post(fileUploadUrl, formData, {headers, reportProgress: true});
    const req = new HttpRequest('POST', fileUploadUrl, formData, {
      headers,
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  getFileDataArrayBuffer(fileResource: ResourceFile, courseId?: number) {
    let cid;
    if (courseId) {
      cid = courseId;
    } else {
      cid = this.instructorCoursesService.currentCourse.id;
    }
    const fileUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      cid +
      '/resource/' +
      fileResource.resourceId +
      '/file';
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    return this.httpClient.get(fileUrl, {
      headers,
      responseType: 'arraybuffer',
    });
  }

  downloadFile(fileResource: ResourceFile, courseId?: number) {
    let cid;
    if (courseId) {
      cid = courseId;
    } else {
      cid = this.instructorCoursesService.currentCourse.id;
    }
    const fileUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      cid +
      '/resource/' +
      fileResource.resourceId +
      '/file';
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    this.httpClient
      .get(fileUrl, {
        headers,
        responseType: 'arraybuffer',
      })
      .subscribe((res: any) => {
        // console.log(res);
        // console.log(btoa(res));
        const blobData = new Blob([res], { type: fileResource.fileType });
        const fileData = new File([blobData], fileResource.fileName, {
          type: fileResource.fileType,
        });
        // console.log(fileData);
        const url = window.URL.createObjectURL(fileData);
        // console.log(url);
        const pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
          alert('Please disable your Pop-up blocker and try again.');
        }
      });
  }

  saveResource(submitData: any, courseId?: number) {
    let cid;
    if (courseId) {
      cid = courseId;
    } else {
      cid = this.instructorCoursesService.currentCourse.id;
    }
    const saveResourceUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      cid +
      '/resource';
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    return this.httpClient.post(saveResourceUrl, submitData, { headers });
  }

  updateResource(submitData: any, courseId?: number) {
    let cid;
    if (courseId) {
      cid = courseId;
    } else {
      cid = this.instructorCoursesService.currentCourse.id;
    }
    const saveResourceUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      cid +
      '/resource/' +
      submitData.resourceId;
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    return this.httpClient.put(saveResourceUrl, submitData, { headers });
  }

  deleteResource(resourceId: any, courseId?: number) {
    let cid;
    if (courseId) {
      cid = courseId;
    } else {
      cid = this.instructorCoursesService.currentCourse.id;
    }
    const deleteResourceUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      cid +
      '/resource/' +
      resourceId;
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    return this.httpClient.delete(deleteResourceUrl, { headers });
  }

  getResource(resourceId: number, courseId: number) {
    const getResourceUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      courseId +
      '/resource/' +
      resourceId;
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    return this.httpClient.get(getResourceUrl, { headers });
  }

  getAllCourseResources(courseId: number, resourceType?: string) {
    const getAllResourcesUrl =
      'http://localhost:8082/spring-security-oauth-resource/course/' +
      courseId +
      '/resources-all';
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    const options: any = {};
    const params = new HttpParams();
    options.headers = headers;
    if (resourceType) {
      params.set('type', resourceType);
    }
    return this.httpClient.get(getAllResourcesUrl, {
      headers,
      params,
    });
  }

  getResourcesByResourceIds(
    resourcesIdsList: number[],
    courseId?: number,
    resourceType?: string
  ) {
    // let cid;
    // if (courseId) {cid = courseId; } else {cid = this.instructorCoursesService.currentCourse.id; }
    const getAllResourcesUrl =
      'http://localhost:8082/spring-security-oauth-resource/instructor/get-resources-all';
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.currentUser.token
    );
    const options: any = {};
    options.headers = headers;
    if (resourceType) {
      options.params = new HttpParams().set('type', resourceType);
    }
    return this.httpClient.post(getAllResourcesUrl, resourcesIdsList, options);
  }

  getResourceListByResourceType(
    courseResources: CourseResources,
    type: string
  ) {
    switch (type) {
      case ResourceTypes.RESOURCE_FILE:
        return courseResources.fileResources;
      case ResourceTypes.RESOURCE_CODE_SNIPPET:
        return courseResources.codeSnippetResources;
      case ResourceTypes.RESOURCE_REPOSITORY:
        return courseResources.repositoryResources;
      case ResourceTypes.RESOURCE_MARKDOWN:
        return courseResources.markdownDocumentResources;
      case ResourceTypes.RESOURCE_LINK:
        return courseResources.linkResources;
      case ResourceTypes.RESOURCE_GUIDE:
        return courseResources.guideResources;
      default:
        return [];
    }
  }
}
