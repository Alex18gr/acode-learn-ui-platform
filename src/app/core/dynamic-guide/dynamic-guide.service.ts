import { Injectable } from '@angular/core';
import {Resource} from '../models/resource-models/resource.model';
import {ResourceGuide} from '../models/resource-models/resource-guide.model';
import {CourseResources, InstructorResourceService} from '../../instructor/resource/instructor-resource.service';
import {map} from 'rxjs/operators';

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
      .pipe(map((receivedResources: CourseResources) => {
        console.log(receivedResources);
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
