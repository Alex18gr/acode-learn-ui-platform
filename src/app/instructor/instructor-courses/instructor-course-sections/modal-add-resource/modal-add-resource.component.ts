import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {ResourceTypes} from '../../../../core/models/resource-models/resource-types';
import {CourseResources, InstructorResourceService} from '../../../resource/instructor-resource.service';
import {ToastService} from '../../../../core/toast/toast.service';
import {DynamicGuideService, GuideDataResource} from '../../../../core/dynamic-guide/dynamic-guide.service';
import {Resource} from '../../../../core/models/resource-models/resource.model';
import {ResourceStore} from '../../../../course/resource/resource.service';

declare var $: any;

@Component({
  selector: 'app-modal-add-resource',
  templateUrl: './modal-add-resource.component.html',
  styleUrls: ['./modal-add-resource.component.css']
})
export class ModalAddResourceComponent implements OnInit {
  @ViewChild('editModal', {static: false}) editModal: ElementRef;
  @ViewChild('resTypeSelect', {static: false}) typeSelect: HTMLSelectElement;
  @Input() courseId;
  title = 'Add Resource';
  resourceTypesSelect = ResourceTypes.ResourceTypesListSelect;
  addResourcesLoading = false;
  resourcesList: CourseResources[];

  constructor(private resourceService: InstructorResourceService,
              private toastService: ToastService,
              private dynamicGuideService: DynamicGuideService) { }

  ngOnInit() {
  }

  showModal() {
    $(this.editModal.nativeElement).modal();

  }

  openModal() {

  }

  hideModal() {
    // in case that the modal is stuck in loading mode
    $(this.editModal.nativeElement).modal('hide');
  }

  onAddResourcesTypeSelectChange(value: any) {
    this.addResourcesLoading = true;
    this.resourceService.getAllCourseResources(this.courseId, value)
      .subscribe((data: any) => {
        console.log(data);
        this.addResourcesLoading = false;
      });
  }

}
