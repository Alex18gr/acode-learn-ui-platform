import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Resource} from '../../course/resource/resource-models/resource.model';
import {ResourceEditFormComponent} from './resource-edit-form/resource-edit-form.component';
import {ResourceTypes} from '../../course/resource/resource-models/resource-types';
import {tap} from 'rxjs/operators';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {InstructorResourceService} from '../resource/instructor-resource.service';
import {ToastService} from '../../core/toast/toast.service';

declare var $: any;

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
  @ViewChild('editModal', {static: false}) editModal: ElementRef;
  @ViewChild('editFormComponent', {static: false}) editFormComponent: ResourceEditFormComponent;
  @Output() modalFormSubmittedSuccess: EventEmitter<{resource: Resource, eventType: string}>
    = new EventEmitter<{resource: Resource, eventType: string}>();
  modalLoading = false;
  editResourceType: string;
  private editResource: Resource;
  private editMode = false;
  title = 'New Resource';
  constructor(private resourceService: InstructorResourceService,
              private toastService: ToastService) { }

  ngOnInit() {
    // $('#myModal').on('hidden.bs.modal', (e) => {
    //   this.editResource = undefined;
    // });
  }

  showModal() {
    $(this.editModal.nativeElement).modal();
  }

  hideModal() {
    // in case that the modal is stuck in loading mode
    this.modalLoading = false;
    $(this.editModal.nativeElement).modal('hide');
  }

  public openModal(resourceType?: string, resource?: Resource) {
    if (resource) {
      this.editResource = resource;
      this.editMode = true;
      this.title = 'Edit Resource';
    } else {
      this.editResource = undefined;
      this.editMode = false;
      this.title = 'New Resource';
    }
    this.editResourceType = resourceType;
    this.showModal();
    this.editFormComponent.initForm();
  }

  onSaveChanges() {
    const submitData = this.editFormComponent.submitForm();
    console.log(submitData);

    switch (this.editResourceType) {
      case ResourceTypes.RESOURCE_FILE:
        this.handleFileResource(submitData);
        break;
      case ResourceTypes.RESOURCE_LINK:
      case ResourceTypes.RESOURCE_GUIDE:
      case ResourceTypes.RESOURCE_CODE_SNIPPET:
      case ResourceTypes.RESOURCE_REPOSITORY:
      case ResourceTypes.RESOURCE_MARKDOWN:
        this.saveOrUpdateResource(submitData);
        break;
    }
  }

  private showProgress(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return percentDone;
    }
  }

  private handleFileResource(submitData) {
    this.modalLoading = true;
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      console.log(submitData);
      console.log(fileReader.result);
      delete submitData.fileData;
      this.resourceService.createFileResourceRequest(
        submitData,
        this.editFormComponent.submitForm().fileData
        // String.fromCharCode.apply(null, new Uint16Array(fileReader.result as ArrayBuffer))
      ).subscribe(data => {
          console.log(this.showProgress(data));
          this.modalLoading = false;
          this.resourceService.getCourseResources();
          this.hideModal();
        },
        error => {
          this.modalLoading = false;
        },
        () => {
          console.log('upload completed');
          this.modalLoading = false;
          this.hideModal();
          this.modalFormSubmittedSuccess.emit({
            eventType: (this.editMode) ? 'update' : 'create',
            resource: submitData
          });
        },
      );
    };
    fileReader.readAsArrayBuffer(submitData.fileData);
    // fileReader.readAsBinaryString(submitData.fileData);
  }

  private saveOrUpdateResource(submitData: any) {
    this.modalLoading = true;
    if (this.editMode) {
      this.resourceService.updateResource(submitData).subscribe((data) => {
        this.handleSaveOrUpdateResponse(data);
      },
(err) => {
          this.handleErrorResponse(err);
      });
    } else {
      this.resourceService.saveResource(submitData).subscribe((data) => {
        this.handleSaveOrUpdateResponse(data);
      },
      (err) => {
        this.handleErrorResponse(err);
      });
    }
  }

  private handleSaveOrUpdateResponse(data: any) {
    this.modalLoading = false;
    this.resourceService.getCourseResources();
    this.hideModal();
    this.modalFormSubmittedSuccess.emit({
      eventType: (this.editMode) ? 'update' : 'create',
      resource: data
    });
  }

  private handleErrorResponse(err: HttpErrorResponse) {
    this.modalLoading = false;
    this.toastService.addErrorToast('Error', err.message);
  }
}
