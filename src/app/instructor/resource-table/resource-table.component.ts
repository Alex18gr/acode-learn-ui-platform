import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceTypes} from '../../core/models/resource-models/resource-types';
import {CourseResources, InstructorResourceService} from '../resource/instructor-resource.service';
import {Course} from '../../course/course.model';
import {retry} from 'rxjs/operators';
import {ResourceFile} from '../../core/models/resource-models/resource-file.model';
import {Resource} from '../../core/models/resource-models/resource.model';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private instructorResourceService: InstructorResourceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  downloadFile(fileResource: ResourceFile) {
    this.instructorResourceService.downloadFile(fileResource);
  }

  navigateToCodeEditor(resourceId: number) {
    this.router.navigate(['/instructor/editor/code'], {
      queryParams: {
        res: resourceId
      }
    });
  }

  getFileTypeClass(fileType: string) {
    switch (fileType) {
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return ['fas fa-file-word'];
      case 'application/pdf':
        return ['fas fa-file-pdf'];
      case 'image/jpeg':
        return ['fas fa-file-image'];
      default:
        return ['fas fa-file'];
    }
  }
}
