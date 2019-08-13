import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Resource} from '../../course/resource/resource-models/resource.model';
import {ResourceEditFormComponent} from './resource-edit-form/resource-edit-form.component';
import {ResourceTypes} from '../../course/resource/resource-models/resource-types';
import {ResourceService} from '../resource/resource.service';
import {tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType} from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
  @ViewChild('editModal', {static: false}) editModal: ElementRef;
  @ViewChild('editFormComponent', {static: false}) editFormComponent: ResourceEditFormComponent;
  @Output() modalFormSubmittedSuccess: EventEmitter<Resource> = new EventEmitter<Resource>();
  modalLoading = false;
  editResourceType: string;
  private editResource: Resource;
  private editMode = false;
  title = 'New Resource';
  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    // $('#myModal').on('hidden.bs.modal', (e) => {
    //   this.editResource = undefined;
    // });
  }

  showModal() {
    $(this.editModal.nativeElement).modal();
  }

  hideModal() {
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

    // handle file resource uploads
    if (this.editResourceType === ResourceTypes.RESOURCE_FILE) {
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
        },
        );
      };
      fileReader.readAsArrayBuffer(submitData.fileData);
      // fileReader.readAsBinaryString(submitData.fileData);
    }
  }

  private showProgress(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return percentDone;
    }
  }
}
