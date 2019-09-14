import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResourceService} from '../../../resource/resource.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Resource} from '../../../../core/models/resource-models/resource.model';
import {ResourceTypes} from '../../../../core/models/resource-models/resource-types';
import {CoursesService} from '../../../courses.service';
import {Course} from '../../../course.model';
import {forkJoin, Subscription} from 'rxjs';

@Component({
  selector: 'app-resource-viewer',
  templateUrl: './resource-viewer.component.html',
  styleUrls: ['./resource-viewer.component.css']
})
export class ResourceViewerComponent implements OnInit, OnDestroy {
  currentResource: Resource;
  resourceTypes = ResourceTypes;
  currentCourseSubscription: Subscription;

  constructor(private resourceService: ResourceService,
              private route: ActivatedRoute,
              private coursesSevice: CoursesService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    // this.coursesSevice.currentCourseChanged.subscribe((course: Course) => {
    //
    // });
    this.route.parent.params.subscribe((par) => {
      this.route.params.subscribe((params) => {
        this.getResource(
          +params.rid,
          +par.cid
        );
      });
    });
  }

  ngOnDestroy(): void {
    if (this.currentCourseSubscription) {
      this.currentCourseSubscription.unsubscribe();
    }
  }

  parseIntZero(x: string): number {
    // @ts-ignore
    // tslint:disable-next-line:triple-equals
    if (x == 0) {
      return 0;
    } else {
      return parseInt(x, 10);
    }
    // return x == 0 ? 0 : (parseInt(x, 10) || x);
  }

  getResource(resourceId: number, courseId: number) {
    this.resourceService.getCourseResource(resourceId, courseId)
      .subscribe((data: Resource) => {
        this.currentResource = data;
      });
  }
}
