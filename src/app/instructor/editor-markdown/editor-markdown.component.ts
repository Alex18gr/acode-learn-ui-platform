import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InstructorResourceService} from '../resource/instructor-resource.service';
import {InstructorCoursesService} from '../courses/instructor-courses.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../core/toast/toast.service';
import * as CodeMirror from 'codemirror';
import * as MarkdownIt from 'markdown-it';
import * as hljs from 'highlight.js';
import {ResourceMarkdown} from '../../core/models/resource-models/resource-markdown.model';

@Component({
  selector: 'app-editor-markdown',
  templateUrl: './editor-markdown.component.html',
  styleUrls: ['./editor-markdown.component.css']
})
export class EditorMarkdownComponent implements OnInit {
  isLoading = true;
  editor: CodeMirror;
  codeEditMode = true;
  courseId: number;
  editingResource: ResourceMarkdown;
  //
  private markdownHTML = '<h1>HELLO WORLD!!!</h1>';
  private markdownView: MarkdownIt;

  @ViewChild('editor', {static: false}) set content(content: ElementRef) {
    this.editorElementRef = content;
  }
  private editorElementRef: ElementRef;

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
      this.editingResource = data as ResourceMarkdown;
      this.isLoading = false;
      this.courseId = courseId;
      this.initEditor();
      this.initMarkdown();
    });
  }

  private initEditor() {

    // load the markdown language styles
    // @ts-ignore
    require('node_modules/codemirror/mode/markdown/markdown.js');

    this.editor = new CodeMirror.fromTextArea(this.editorElementRef.nativeElement,
      {
        lineNumbers: true,
        mode: {
          name: 'markdown',
          globalVars: true
        },
        readOnly: false,
        viewportMargin: Infinity
      }
    );
    this.editor.setSize(null, 'auto');
    this.editor.getDoc().setValue(this.editingResource.markdownDocumentData);
  }

  onSaveCodeDocument() {
    // maybe here check authorization
    const documentValue = this.editor.getValue();
    this.editingResource.markdownDocumentData = documentValue;
    console.log(documentValue);
    this.isLoading = true;
    this.instructorResourceService.updateResource(this.editingResource, this.courseId)
      .subscribe(data => {
        this.editingResource = data as ResourceMarkdown;
        this.toastService.addSaveToast('Resource Saved',
          'Resource ' + this.editingResource.name + ' of course ' +
          this.editingResource.courseName + ' saved successfully.');
        this.isLoading = false;
      });
  }

  codeMirrorAction(action: string) {
    switch (action) {
      case 'undo':
        this.editor.undo();
        break;
      case 'redo':
        this.editor.redo();
        break;
    }
  }

  initMarkdown() {
    MarkdownIt({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs(lang, str).value;
          } catch (__) {
          }
        }
        return '';
      }
    });
    this.markdownView = new MarkdownIt({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs(lang, str).value;
          } catch (__) {
          }
        }
        return '';
      }
    });
  }

  toggleCodeEditMode() {
      if (this.codeEditMode) {
        // view the markdown
        this.editingResource.markdownDocumentData = this.editor.getValue();
        this.initMarkdownData();
        this.codeEditMode = false;
      } else {
        // view the code
        // this.initEditor();
        this.editor.getDoc().setValue(this.editingResource.markdownDocumentData);
        this.codeEditMode = true;
      }
    }

  // toggleCodeEditMode() {
  //   if (this.codeEditMode) {
  //     // view the markdown
  //     this.markdownHTML = null;
  //     this.codeEditMode = false;
  //   } else {
  //     // view the code
  //     this.editor = null;
  //     this.codeEditMode = true;
  //   }
  // }

  // ngAfterViewChecked(): void {
  //   if (!this.codeEditMode && this.markdownHTML === null && this.editor) {
  //     this.editingResource.markdownDocumentData = this.editor.getValue();
  //     this.initMarkdownData();
  //   } else if (this.codeEditMode && this.editor === null) {
  //     this.initEditor();
  //   }
  // }

  private initMarkdownData() {
    this.markdownHTML = this.markdownView.render(this.editingResource.markdownDocumentData);
  }
}
