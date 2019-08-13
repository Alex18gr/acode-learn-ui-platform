import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Resource} from '../../../course/resource/resource-models/resource.model';
import {ResourceTypes} from '../../../course/resource/resource-models/resource-types';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ResourceLink} from '../../../course/resource/resource-models/resource-link.model';
import {InstructorCoursesService} from '../../courses/instructor-courses.service';

import * as _ from 'lodash';
import * as moment from 'moment';
import {ResourceFile} from '../../../course/resource/resource-models/resource-file.model';
import {ResourceRepository} from '../../../course/resource/resource-models/resource-repository.model';
import {ResourceCodeSnippet} from '../../../course/resource/resource-models/resource-code-snippet.model';
import {ResourceMarkdown} from '../../../course/resource/resource-models/resource-markdown.model';
import {ResourceGuide} from '../../../course/resource/resource-models/resource-guide.model';

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
    this.form = undefined;
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
      case ResourceTypes.RESOURCE_CODE_SNIPPET:
        this.form = this.getCodeSnippetResourceFormGroup();
        break;
      case ResourceTypes.RESOURCE_GUIDE:
        this.form = this.getGuideResourceFormGroup();
        break;
    }

    // if the resource is set, then the edit mode is active and
    //  we need to set the values of the current editing resource to the form
    if (this.resource) {
      this.patchFormValues();
    }
  }

  private patchFormValues() {
    let res;
    switch (this.resourceType) {
      case ResourceTypes.RESOURCE_LINK:
        res = this.resource as ResourceLink;
        this.form.patchValue({
          resLinkName: res.name,
          resLinkUrl: res.link,
          resLinkDescription: res.description
        });
        break;
      case ResourceTypes.RESOURCE_REPOSITORY:
        res = this.resource as ResourceRepository;
        this.form.patchValue({
          resRepoName: res.name,
          resRepositoryName: res.repoName,
          resRepoUrl: res.repoUrl,
          repoNameRepo: res.repoNameRepo
        });
        break;
      case ResourceTypes.RESOURCE_MARKDOWN:
        res = this.resource as ResourceMarkdown;
        this.form.patchValue({
          mdName: res.name,
          mdTitle: res.documentTitle,
          mdDescription: res.description,
          mdData: res.markdownDocumentData
        });
        break;
      case ResourceTypes.RESOURCE_CODE_SNIPPET:
        res = this.resource as ResourceCodeSnippet;
        this.form.patchValue({
          csName: res.name,
          csTitle: res.snippetTitle,
          csDescription: res.snippetDescription,
          csData: res.snippetDocumentData,
          csLang: res.snippetLanguage
        });
        break;
      case ResourceTypes.RESOURCE_GUIDE:
        res = this.resource as ResourceGuide;
        this.form.patchValue({
          gdName: res.name,
          gDescription: res.guideDescription
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
      mdName: new FormControl(''),
      mdTitle: new FormControl(''),
      mdDescription: new FormControl(''),
      mdData: new FormControl('')
    });
  }

  private getCodeSnippetResourceFormGroup() {
    return new FormGroup({
      csName: new FormControl(''),
      csTitle: new FormControl(''),
      csDescription: new FormControl(''),
      csData: new FormControl(''),
      csLang: new FormControl('')
    });
  }

  private getGuideResourceFormGroup() {
    return new FormGroup({
      gdName: new FormControl(''),
      gDescription: new FormControl('')
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
      case ResourceTypes.RESOURCE_REPOSITORY:
        (submitData as ResourceRepository).name = rawValue.resRepoName;
        (submitData as ResourceRepository).repoName = rawValue.resRepositoryName;
        (submitData as ResourceRepository).repoUrl = rawValue.resRepoUrl;
        (submitData as ResourceRepository).repoNameRepo = rawValue.repoNameRepo;
        return submitData;
      case ResourceTypes.RESOURCE_CODE_SNIPPET:
        (submitData as ResourceCodeSnippet).name = rawValue.csName;
        (submitData as ResourceCodeSnippet).snippetTitle = rawValue.csTitle;
        (submitData as ResourceCodeSnippet).snippetDescription = rawValue.csDescription;
        (submitData as ResourceCodeSnippet).snippetDocumentData = rawValue.csData;
        (submitData as ResourceCodeSnippet).snippetLanguage = rawValue.csLang;
        return submitData;
      case ResourceTypes.RESOURCE_MARKDOWN:
        (submitData as ResourceMarkdown).name = rawValue.mdName;
        (submitData as ResourceMarkdown).description = rawValue.mdDescription;
        (submitData as ResourceMarkdown).markdownDocumentData = rawValue.mdData;
        return submitData;
      case ResourceTypes.RESOURCE_GUIDE:
        (submitData as ResourceGuide).name = rawValue.gdName;
        (submitData as ResourceGuide).guideDescription = rawValue.gDescription;
        return submitData;
    }
  }

  handleFileInput(files: any) {
    this.uploadFile = files.item(0);
  }
}
