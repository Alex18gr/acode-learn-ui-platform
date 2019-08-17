import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Resource} from '../../models/resource-models/resource.model';
import {CourseResources, InstructorResourceService} from '../../../instructor/resource/instructor-resource.service';
import {ToastService} from '../../toast/toast.service';
import {DynamicGuideService, GuideData, GuideDataResource} from '../dynamic-guide.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ResourceTypes} from '../../models/resource-models/resource-types';
import {ResourceStore} from '../../../course/resource/resource.service';

declare var $: any;

@Component({
  selector: 'app-dynamic-guide-edit-resources-modal',
  templateUrl: './dynamic-guide-edit-resources-modal.component.html',
  styleUrls: ['./dynamic-guide-edit-resources-modal.component.css']
})
export class DynamicGuideEditResourcesModalComponent implements OnInit {
  @ViewChild('editModal', {static: false}) editModal: ElementRef;
  @ViewChild('resTypeSelect', {static: false}) typeSelect: HTMLSelectElement;
  @ViewChild('addResourcesDragDrop', {static: false}) addResourcesDragDrop: any;
  @Output() editChangesSubmitted: EventEmitter<GuideData>
    = new EventEmitter<GuideData>();
  @Input() guideResourceData: GuideData;
  @Input() courseId;
  addResourcesList: GuideDataResource[];

  modalLoading = false;
  title = 'Edit Guide Resources';
  resourceTypesSelect = ResourceTypes.ResourceTypesListSelect;
  private addResourcesLoading = false;

  constructor(private resourceService: InstructorResourceService,
              private toastService: ToastService,
              private dynamicGuideService: DynamicGuideService) { }

  ngOnInit() {
  }

  showModal() {
    $(this.editModal.nativeElement).modal();
  }

  hideModal() {
    // in case that the modal is stuck in loading mode
    this.modalLoading = false;
    $(this.editModal.nativeElement).modal('hide');
  }

  public openModal() {
    this.showModal();
  }

  onSaveChanges() {
    this.editChangesSubmitted.emit(this.guideResourceData);
    this.hideModal();
  }

//  Drag and drop example

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];
  addResources: any;

  drop(event: CdkDragDrop<GuideDataResource[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onAddResourcesTypeSelectChange(value: any) {
    this.addResourcesLoading = true;
    this.resourceService.getAllCourseResources(this.courseId, value)
      .subscribe((data: any) => {
        console.log(data);
        this.addResourcesLoading = false;
        const resList = this.resourceService.getResourceListByResourceType(data.resources, value);
        this.addResourcesList = this.dynamicGuideService.getGuideResourcesFromResourcesList(
          resList
        );
      });
  }
}
