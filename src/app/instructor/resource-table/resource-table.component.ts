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
        res: resourceId,
        cid: this.currentCourse.id
      }
    });
  }

  navigateToMarkdownEditor(resourceId: number) {
    this.router.navigate(['/instructor/editor/markdown'], {
      queryParams: {
        res: resourceId,
        cid: this.currentCourse.id
      }
    });
  }

  navigateToGuideEditor(resourceId: number) {
    this.router.navigate(['/instructor/editor/guide'], {
      queryParams: {
        res: resourceId,
        cid: this.currentCourse.id
      }
    });
  }

  getFileTypeClass(fileType: string) {
    switch (fileType) {
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return ['fas fa-file-word'];
      case 'application/pdf':
        return ['fas fa-file-pdf'];
      case 'image/jpeg':
      case 'image/gif':
      case 'image/vnd.microsoft.icon':
        return ['fas fa-file-image'];
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return ['fas fa=file-excel'];
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return ['fas fa-file-powerpoint'];
      case 'application/x-rar-compressed':
      case 'application/zip':
      case 'application/x-zip-compressed':
      case 'application/x-7z-compressed':
        return ['fas fa-file-archive'];
      default:
        return ['fas fa-file'];
    }
  }
}
