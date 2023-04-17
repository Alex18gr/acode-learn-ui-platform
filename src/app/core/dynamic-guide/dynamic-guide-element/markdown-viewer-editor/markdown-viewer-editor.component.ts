import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResourceCodeSnippet } from '../../../models/resource-models/resource-code-snippet.model';
import { ResourceMarkdown } from '../../../models/resource-models/resource-markdown.model';
import * as CodeMirror from 'codemirror';
import * as MarkdownIt from 'markdown-it';
import { InstructorResourceService } from '../../../../instructor/resource/instructor-resource.service';
import { ToastService } from '../../../toast/toast.service';
import { Resource } from '../../../models/resource-models/resource.model';

@Component({
  selector: 'app-markdown-viewer-editor',
  templateUrl: './markdown-viewer-editor.component.html',
  styleUrls: ['./markdown-viewer-editor.component.css'],
})
export class MarkdownViewerEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', { static: false }) editorElementRef: ElementRef;
  @ViewChild('markdown', { static: false }) markdownViewElement: ElementRef;
  @ViewChild('editForm', { static: false }) editForm: NgForm;
  @Input() resource: ResourceMarkdown;
  @Input() editMode: boolean;
  @Input() courseId;
  markdownHTML = '';
  isEditing = false;
  mdDataCurrentValue: string;
  editor: any;
  isSaving = false;
  viewerMode = true;
  markdownView: MarkdownIt;

  constructor(
    private instructorResourceService: InstructorResourceService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.initMarkdown();
  }

  ngAfterViewInit(): void {}

  initEditor() {
    if (!this.editor) {
      // @ts-ignore
      require('node_modules/codemirror/mode/markdown/markdown.js');
      this.editor = new CodeMirror.fromTextArea(
        this.editorElementRef.nativeElement,
        {
          lineNumbers: true,
          mode: {
            name: 'markdown',
            globalVars: true,
          },
          viewportMargin: Infinity,
        }
      );
      this.editor.setSize(null, 'auto');
    }
    this.editor.getDoc().setValue(this.resource.markdownDocumentData);
  }

  initMarkdown() {
    if (!this.markdownView) {
      this.markdownView = new MarkdownIt();
    }
    const mdData = this.markdownView.render(this.resource.markdownDocumentData);
    // const mdElement = this.renderer.createElement(mdData);
    this.markdownHTML = mdData;
    // this.renderer.appendChild(this.mdViewElement, mdElement);
  }

  startEditMode() {
    if (this.editMode) {
      this.mdDataCurrentValue = this.resource.markdownDocumentData;
      this.isEditing = true;
      this.viewerMode = false;
      this.editForm.setValue({
        title: this.resource.documentTitle,
      });
      this.initEditor();
    }
  }

  toggleCodeEditMode() {
    if (this.editMode) {
      if (this.viewerMode) {
        this.initEditor();
      } else if (!this.viewerMode) {
        this.resource.markdownDocumentData = this.editor.getValue();
        this.initMarkdown();
      }
      this.viewerMode = !this.viewerMode;
    }
  }

  onSaveMarkdown() {
    if (this.editMode) {
      this.resource.markdownDocumentData = this.editor.getValue();
      this.isSaving = true;
      this.saveChanges().subscribe(
        (data: ResourceMarkdown) => {
          this.toastService.addResourceSavedSuccessfully(data as Resource);
          this.isSaving = false;
          this.isEditing = false;
          this.viewerMode = true;
          this.initMarkdown();
        },
        (error) => {
          this.isSaving = false;
          this.toastService.addResourceSaveErrorSuccessfully(this.resource);
        }
      );
    }
  }

  onCancelEditing() {
    this.isEditing = false;
    this.resource.markdownDocumentData = this.mdDataCurrentValue;
    this.viewerMode = true;
    this.initMarkdown();
  }

  private saveChanges() {
    // here we save the changes to the sever
    return this.instructorResourceService.updateResource(
      this.resource,
      this.courseId
    );
  }
}
