import {Component, OnInit, ViewChild} from '@angular/core';
import {ResourceService} from '../../resource/resource.service';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../../courses.service';
import {CourseSection} from '../../../core/models/course-section.model';
import {ResourceTypes} from '../../../core/models/resource-models/resource-types';

@Component({
  selector: 'app-course-section-page',
  templateUrl: './course-section-page.component.html',
  styleUrls: ['./course-section-page.component.css']
})
export class CourseSectionPageComponent implements OnInit {
  @ViewChild('selectResourceType', {static: false}) selectResourceType: HTMLSelectElement;
  currCourseId: number;
  currSectionId: number;
  courseSection: CourseSection;
  resourcesType = 'RESOURCES_ALL';
  resourceTypesListSelect = ResourceTypes.ResourceTypesListSelect;

  constructor(private resourceService: ResourceService,
              private route: ActivatedRoute,
              private coursesSevice: CoursesService) { }

  ngOnInit() {
    this.initData();
  }

  resourceTypeChanged(event: Event) {
    this.resourcesType = (event.target as HTMLSelectElement).value;
  }

  initData() {
    this.route.parent.params.subscribe((par) => {
      this.route.params.subscribe((params) => {
        this.currCourseId = +par.cid;
        this.currSectionId = +params.rid;
        this.getSection(
          +params.secid,
          +par.cid
        );
      });
    });
  }

  private getSection(sectionId: number, courseId: number) {
    this.coursesSevice.getCourseSection(courseId, sectionId)
      .subscribe((courseSection) => {
        this.courseSection = courseSection as unknown as CourseSection;
      });
  }
}
