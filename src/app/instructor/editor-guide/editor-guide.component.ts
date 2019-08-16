import { Component, OnInit } from '@angular/core';
import {ResourceGuide} from '../../core/models/resource-models/resource-guide.model';
import {InstructorResourceService} from '../resource/instructor-resource.service';
import {InstructorCoursesService} from '../courses/instructor-courses.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../core/toast/toast.service';
import {ResourceCodeSnippet} from '../../core/models/resource-models/resource-code-snippet.model';

@Component({
  selector: 'app-editor-guide',
  templateUrl: './editor-guide.component.html',
  styleUrls: ['./editor-guide.component.css']
})
export class EditorGuideComponent implements OnInit {
  guideResource: ResourceGuide;
  isLoading = false;
  private courseId: number;

  constructor(private instructorResourceService: InstructorResourceService,
              private instructorCoursesService: InstructorCoursesService,
              private router: Router,
              private route: ActivatedRoute,
              private toastService: ToastService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('res') && params.get('cid')) {
        this.getResource(parseInt(params.get('res'), 10), parseInt(params.get('cid'), 10));
      }
    });
  }

  private getResource(resourceId: number, courseId: number) {
    this.isLoading = true;
    this.instructorResourceService.getResource(resourceId, courseId).subscribe(data => {
      this.isLoading = false;
      this.courseId = courseId;
      this.guideResource = data as ResourceGuide;
      // this.initEditor();
    });
  }

}
