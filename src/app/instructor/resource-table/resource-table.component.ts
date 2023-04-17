import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResourceTypes } from '../../core/models/resource-models/resource-types';
import {
  CourseResources,
  InstructorResourceService,
} from '../resource/instructor-resource.service';
import { Course } from '../../course/course.model';
import { ResourceFile } from '../../core/models/resource-models/resource-file.model';
import { Resource } from '../../core/models/resource-models/resource.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../course/resource/resource.service';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css'],
})
export class ResourceTableComponent implements OnInit {
  @Input() resourceType: string;
  @Input() resources: CourseResources;
  @Input() currentCourse: Course;
  @Input() courseId: number;
  @Input() instructorMode: boolean;
  @Output() editResource: EventEmitter<Resource> = new EventEmitter<Resource>();
  @Output() deleteResource: EventEmitter<Resource> =
    new EventEmitter<Resource>();
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

  constructor(
    private instructorResourceService: InstructorResourceService,
    private router: Router,
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit() {}

  downloadFile(fileResource: ResourceFile) {
    this.instructorResourceService.downloadFile(fileResource);
  }

  navigateToCodeEditor(resourceId: number) {
    if (this.instructorMode) {
      this.router.navigate(['/instructor/editor/code'], {
        queryParams: {
          res: resourceId,
          cid: this.currentCourse.id,
        },
      });
    } else {
      this.navigateToResource(resourceId);
    }
  }

  navigateToMarkdownEditor(resourceId: number) {
    if (this.instructorMode) {
      this.router.navigate(['/instructor/editor/markdown'], {
        queryParams: {
          res: resourceId,
          cid: this.currentCourse.id,
        },
      });
    } else {
      this.navigateToResource(resourceId);
    }
  }

  navigateToGuideEditor(resourceId: number) {
    if (this.instructorMode) {
      this.router.navigate(['/instructor/editor/guide'], {
        queryParams: {
          res: resourceId,
          cid: this.currentCourse.id,
        },
      });
    } else {
      this.navigateToResource(resourceId);
    }
  }

  navigateToResource(resourceId: number) {
    if (!this.currentCourse) {
      this.router
        .navigate(['student/course/', this.courseId, 'resources', resourceId], {
          // relativeTo: this.route
        })
        .then((data) => {
          // this.resourceService.selectedViewResourceChanged.next(true);
        });
    } else {
      this.router
        .navigate(
          ['student/course/', this.currentCourse.id, 'resources', resourceId],
          {
            // relativeTo: this.route
          }
        )
        .then((data) => {
          // this.resourceService.selectedViewResourceChanged.next(true);
        });
    }
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
