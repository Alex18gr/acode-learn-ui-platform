import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Resource} from '../../../course/resource/resource-models/resource.model';
import {ResourceTypes} from '../../../course/resource/resource-models/resource-types';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ResourceLink} from '../../../course/resource/resource-models/resource-link.model';
import {InstructorCoursesService} from '../../courses/instructor-courses.service';

import * as _ from 'lodash';
import * as moment from 'moment';
import {ResourceFile} from '../../../course/resource/resource-models/resource-file.model';

@Component({
  selector: 'app-resource-edit-form',
  templateUrl: './resource-edit-form.component.html',
  styleUrls: ['./resource-edit-form.component.css']
})
export class ResourceEditFormComponent implements OnInit, OnChanges {
  @Input() resource: Resource;
  @Input() resourceType: string;
  ResTypes = ResourceTypes;
  form: FormGroup;
  uploadFile: File;

  constructor(private instructorCoursesService: InstructorCoursesService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resource && changes.resource.previousValue !== changes.resource.currentValue ||
      changes.resourceType && changes.resourceType.previousValue !== changes.resourceType.currentValue
    ) {
      this.initForm();
    }
  }

  initForm() {
    switch (this.resourceType) {
      case ResourceTypes.RESOURCE_LINK:
        this.form = this.getLinkResourceFormGroup();
        break;
      case ResourceTypes.RESOURCE_FILE:
        if (this.resource) {
          // put the edit resource here
        } else {
          this.form = this.getNewFileResourceFormGroup();
        }
        break;
      case ResourceTypes.RESOURCE_REPOSITORY:
        this.form = this.getRepositoryResourceFormGroup();
        break;
      case ResourceTypes.RESOURCE_MARKDOWN:
        this.form = this.getMarkdownResourceFormGroup();
        break;
    }

    // if the resource is set, then the edit mode is active and
    //  we need to set the values of the current editing resource to the form
    if (this.resource) {
      this.patchFormValues();
    }
  }

  private patchFormValues() {
    switch (this.resourceType) {
      case ResourceTypes.RESOURCE_LINK:
        const res = this.resource as ResourceLink;
        this.form.patchValue({
          resLinkName: res.name,
          resLinkUrl: res.link,
          resLinkDescription: res.description
        });
        break;
    }
  }

  public submitForm() {
    if (this.form.valid) {
      return this.getEditedResource(this.form.getRawValue());
    }
  }

  private getLinkResourceFormGroup() {
    return new FormGroup({
      resLinkName: new FormControl(''),
      resLinkUrl: new FormControl('', [Validators.required]),
      resLinkDescription: new FormControl('')
    });
  }

  private getRepositoryResourceFormGroup() {
    return new FormGroup({
      resRepoName: new FormControl(''),
      resRepositoryName: new FormControl(''),
      resRepoUrl: new FormControl(''),
      repoNameRepo: new FormControl('')
    });
  }

  private getNewFileResourceFormGroup() {
    return new FormGroup({
      resFileName: new FormControl(''),
      resFileData: new FormControl(''),
      resFileFileName: new FormControl(''),
      resFileSummary: new FormControl('')
    });
  }

  private getMarkdownResourceFormGroup() {
    return new FormGroup({
      resMdName: new FormControl(''),
      resMdDocTitle: new FormControl(''),
      resMdDocData: new FormControl('')
    });
  }

  getRepositoryName() {
    if (this.form.getRawValue().resRepoUrl) {
      return this.form.getRawValue().resRepoUrl.split('github.com/')[1];
    }
  }

  private getEditedResource(rawValue: any) {
    let submitData: any = {};
    if (this.resource) {
      submitData = _.cloneDeep(this.resource);
    } else {
      // convert the date to the desired format
      submitData.dateCreated = moment().format('YYYY-MM-DD');
      submitData.resourceType = this.resourceType;
      submitData.courseName = this.instructorCoursesService.currentCourse.name;
    }

    switch (this.resourceType) {
      case ResourceTypes.RESOURCE_LINK:
        (submitData as ResourceLink).name = rawValue.resLinkName;
        (submitData as ResourceLink).link = rawValue.resLinkUrl;
        (submitData as ResourceLink).description = rawValue.resLinkDescription;
        return submitData;
      case ResourceTypes.RESOURCE_FILE:
        (submitData as ResourceFile).name = rawValue.resFileName;
        (submitData as ResourceFile).fileName = rawValue.resFileFileName;
        (submitData as ResourceFile).summary = rawValue.resFileSummary;
        (submitData as any).fileData = this.uploadFile;
        return submitData;
    }
  }

  handleFileInput(files: any) {
    this.uploadFile = files.item(0);
  }
}
