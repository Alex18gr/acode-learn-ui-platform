import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceTypes} from '../../course/resource/resource-models/resource-types';
import {CourseResources, ResourceService} from '../resource/resource.service';
import {Course} from '../../course/course.model';
import {retry} from 'rxjs/operators';
import {ResourceFile} from '../../course/resource/resource-models/resource-file.model';
import {Resource} from '../../course/resource/resource-models/resource.model';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent implements OnInit {
  @Input() resourceType: string;
  @Input() resources: CourseResources;
  @Input() currentCourse: Course;
  @Output() editResource: EventEmitter<Resource> = new EventEmitter<Resource>();
  @Output() deleteResource: EventEmitter<Resource> = new EventEmitter<Resource>();
  resourceTypes = ResourceTypes;
  get allResourcesEmpty() {
    for (const res in this.resources) {
      if (res.hasOwnProperty('length')) {
        if (res.length > 0) {
          return false;
        }
      }
    }
    return true;
  }

  resourcesEmpty(res: any[]) {
    return res.length <= 0;
  }

  constructor(private instructorResourceService: ResourceService) { }

  ngOnInit() {
  }

  downloadFile(fileResource: ResourceFile) {
    this.instructorResourceService.downloadFile(fileResource);
  }

  getFileTypeClass(fileType: string) {
    switch (fileType) {
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return ['fas fa-file-word'];
      case 'application/pdf':
        return ['fas fa-file-pdf'];
      default:
        return ['fas fa-file'];
    }
  }
}
