import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseSection} from '../../../../core/models/course-section.model';
import {InstructorResourceService} from '../../../resource/instructor-resource.service';
import {Resource} from '../../../../core/models/resource-models/resource.model';

@Component({
  selector: 'app-course-section-resources-table',
  templateUrl: './course-section-resources-table.component.html',
  styleUrls: ['./course-section-resources-table.component.css']
})
export class CourseSectionResourcesTableComponent implements OnInit {
  @Input() courseSection: CourseSection;
  @Output() deleteResource: EventEmitter<Resource> = new EventEmitter<Resource>();

  constructor(private instructorResourceService: InstructorResourceService) { }

  ngOnInit() {
  }

  getResourcesList() {
    if (!this.courseSection.resources) {
      return [];
    }
    return this.instructorResourceService.getResourcesFromCourseResources(this.courseSection.resources);
  }

  onDeleteResource($event: MouseEvent, res: Resource) {
    this.deleteResource.emit(res);
  }
}
