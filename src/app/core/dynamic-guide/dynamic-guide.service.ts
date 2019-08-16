import { Injectable } from '@angular/core';
import {Resource} from '../models/resource-models/resource.model';
import {ResourceGuide} from '../models/resource-models/resource-guide.model';
import {CourseResources, InstructorResourceService} from '../../instructor/resource/instructor-resource.service';
import {map} from 'rxjs/operators';
import {ResourceTypes} from '../models/resource-models/resource-types';

@Injectable({
  providedIn: 'root'
})
export class DynamicGuideService {

  constructor(private instructorResourceService: InstructorResourceService) { }

  getGuideDataFromResource(guideResource: ResourceGuide) {
    const mGuideData: GuideData = {
      title: guideResource.guideTitle,
      description: guideResource.guideDescription,
      dateCreated: guideResource.dateCreated,
      guideResource
    };

    // get the resource ids list in order to receive the resources
    const resourceIdsList = this.getResourceIdsList(guideResource.guideData);

    return this.instructorResourceService.getResourcesByResourceIds(resourceIdsList)
      .pipe(map((receivedResources: {resources: CourseResources}) => {
        console.log(receivedResources);
        mGuideData.resources = this.getGuideResourcesFromReceivedCourses(guideResource, receivedResources.resources);
        return mGuideData;
      }));
  }

  private getResourceIdsList(guideData: string) {
    const guideDataObject = JSON.parse(guideData);
    const resourceIdsList = [];
    for (const res of guideDataObject) {
      resourceIdsList.push(res.resourceId);
    }
    return resourceIdsList;
  }

  private getGuideResourcesFromReceivedCourses(guideResource: ResourceGuide, receivedResources: CourseResources) {
    const guideDataResources: GuideDataResource[] = [];
    for (const guideResData of JSON.parse(guideResource.guideData)) {
      let index: number;
      switch (guideResData.type) {
        case ResourceTypes.RESOURCE_LINK:
          index = this.resourceIdExistsIn(guideResData.resourceId, receivedResources.linkResources);
          if (index >= 0) {
            // @ts-ignore
            const guideDataResource: GuideDataResource = {};
            guideDataResource.resourceId = guideResData.resourceId;
            guideDataResource.order = guideResData.order;
            guideDataResource.type = guideResData.type;
            guideDataResource.resourceData = receivedResources.linkResources[index];
            guideDataResources.push(guideDataResource);
          }
          break;
        case ResourceTypes.RESOURCE_MARKDOWN:
          index = this.resourceIdExistsIn(guideResData.resourceId, receivedResources.markdownDocumentResources);
          if (index >= 0) {
            // @ts-ignore
            const guideDataResource: GuideDataResource = {};
            guideDataResource.resourceId = guideResData.resourceId;
            guideDataResource.order = guideResData.order;
            guideDataResource.type = guideResData.type;
            guideDataResource.resourceData = receivedResources.markdownDocumentResources[index];
            guideDataResources.push(guideDataResource);
          }
          break;
        case ResourceTypes.RESOURCE_REPOSITORY:
          index = this.resourceIdExistsIn(guideResData.resourceId, receivedResources.repositoryResources)
          if (index >= 0) {
            // @ts-ignore
            const guideDataResource: GuideDataResource = {};
            guideDataResource.resourceId = guideResData.resourceId;
            guideDataResource.order = guideResData.order;
            guideDataResource.type = guideResData.type;
            guideDataResource.resourceData = receivedResources.repositoryResources[index];
            guideDataResources.push(guideDataResource);
          }
          break;
        case ResourceTypes.RESOURCE_CODE_SNIPPET:
          index = this.resourceIdExistsIn(guideResData.resourceId, receivedResources.codeSnippetResources);
          if (index >= 0) {
            // @ts-ignore
            const guideDataResource: GuideDataResource = {};
            guideDataResource.resourceId = guideResData.resourceId;
            guideDataResource.order = guideResData.order;
            guideDataResource.type = guideResData.type;
            guideDataResource.resourceData = receivedResources.codeSnippetResources[index];
            guideDataResources.push(guideDataResource);
          }
          break;
        case ResourceTypes.RESOURCE_FILE:
          index = this.resourceIdExistsIn(guideResData.resourceId, receivedResources.fileResources);
          if (index >= 0) {
            // @ts-ignore
            const guideDataResource: GuideDataResource = {};
            guideDataResource.resourceId = guideResData.resourceId;
            guideDataResource.order = guideResData.order;
            guideDataResource.type = guideResData.type;
            guideDataResource.resourceData = receivedResources.fileResources[index];
            guideDataResources.push(guideDataResource);
          }
          break;
      }
    }

    guideDataResources.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      }
      return 0;
    });
    return guideDataResources;
  }

  private resourceIdExistsIn(resourceId: number, resources: any[]) {
    for (const res of resources) {
      if (resourceId === res.resourceId) {
        return resources.indexOf(res);
      }
    }
    return -1;
  }
}

export interface GuideDataResource {
  resourceId: number;
  order: number;
  type: string;
  resourceData: Resource;
}

export interface GuideData {
  title: string;
  description: string;
  dateCreated: Date;
  guideResource: ResourceGuide;
  resources?: GuideDataResource[];
}
