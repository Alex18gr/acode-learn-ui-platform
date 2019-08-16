import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Resource} from '../../core/models/resource-models/resource.model';
import {InstructorResourceService} from '../resource/instructor-resource.service';
import {ToastService} from '../../core/toast/toast.service';

declare var $: any;

@Component({
  selector: 'app-delete-resource',
  templateUrl: './delete-resource.component.html',
  styleUrls: ['./delete-resource.component.css']
})
export class DeleteResourceComponent implements OnInit {
  @ViewChild('deleteModal', {static: false}) deleteModal: ElementRef;
  @Output() deleteSuccess: EventEmitter<Resource>
    = new EventEmitter<Resource>();
  modalLoading = false;
  private deleteResource: Resource;
  title = 'Delete Resource';
  constructor(private resourceService: InstructorResourceService,
              private toastService: ToastService) { }

  showModal() {
    $(this.deleteModal.nativeElement).modal();
  }

  hideModal() {
    // in case that the modal is stuck in loading mode
    this.modalLoading = false;
    $(this.deleteModal.nativeElement).modal('hide');
  }

  public openModal(resource: Resource) {
    this.deleteResource = resource;
    this.showModal();
  }

  onDeleteResource() {
    this.modalLoading = true;
    this.resourceService.deleteResource(this.deleteResource.resourceId)
      .subscribe(() => {
        this.modalLoading = false;
        this.toastService.addDeleteToast('Resource Deleted', 'Resource "' +
        this.deleteResource.name + '" deleted successfully.');
        this.deleteSuccess.emit(this.deleteResource);
        this.hideModal();
      },
      (error => {
        this.modalLoading = false;
        this.toastService.addErrorToast('Resource Delete Error',
          'An error occurred while deleteing resource "' +
        this.deleteResource.name + '".');
      }));
  }

  ngOnInit() {
  }

}
