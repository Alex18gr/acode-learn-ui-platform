import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Resource} from '../../course/resource/resource-models/resource.model';

declare var $: any;

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
  @ViewChild('editModal', {static: false}) editModal: ElementRef;
  @Output() modalFormSubmitted: EventEmitter<Resource> = new EventEmitter<Resource>();
  private editResource: Resource;
  private editMode = false;
  title = 'New Resource';
  constructor() { }

  ngOnInit() {
  }

  public openModal(resource?: Resource) {
    if (resource) {
      this.editResource = resource;
      this.editMode = true;
      this.title = 'Edit Resource';
    }
    $(this.editModal.nativeElement).modal();
  }

}
