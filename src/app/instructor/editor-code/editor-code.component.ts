import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InstructorResourceService} from '../resource/instructor-resource.service';
import {InstructorCoursesService} from '../courses/instructor-courses.service';
import {ResourceCodeSnippet} from '../../core/models/resource-models/resource-code-snippet.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as CodeMirror from 'codemirror';
import {ToastService} from '../../core/toast/toast.service';

@Component({
  selector: 'app-editor-code',
  templateUrl: './editor-code.component.html',
  styleUrls: ['./editor-code.component.css']
})
export class EditorCodeComponent implements OnInit {
  private editorElementRef: ElementRef;
  private courseId: number;
  @ViewChild('editor', {static: false}) set content(content: ElementRef) {
    this.editorElementRef = content;
  }
  editingResource: ResourceCodeSnippet;
  modeLanguage = '';
  isLoading = true;
  editor: CodeMirror;
  languageOptions = [
    {value: '', key: ''},
    {value: 'text/x-java', key: 'Java'},
    {value: 'javascript', key: 'Javascript'},
    {value: 'clike', key: 'C/C++'},
    {value: 'python', key: 'Python'},
    {value: 'php', key: 'PHP'},
    {value: 'htmlmixed', key: 'HTML-mixed'},
    {value: 'markdown', key: 'Markdown'}
  ];

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
      this.editingResource = data as ResourceCodeSnippet;
      this.isLoading = false;
      this.courseId = courseId;
      this.initEditor();
    });
  }

  private initEditor() {
    // get the language of the document form the resource data
    this.modeLanguage = this.editingResource.snippetLanguage;

    // load the languages styles
    this.loadLanguages();

    this.editor = new CodeMirror.fromTextArea(this.editorElementRef.nativeElement,
      {
        lineNumbers: true,
        mode: {
          name: this.modeLanguage,
          globalVars: true
        },
        readOnly: false,
        viewportMargin: Infinity
      }
    );
    this.editor.setSize(null, 'auto');
    this.editor.getDoc().setValue(this.editingResource.snippetDocumentData);
  }

  onSaveCodeDocument() {
    // maybe here check authorization
    const documentValue = this.editor.getValue();
    this.editingResource.snippetDocumentData = documentValue;
    this.editingResource.snippetLanguage = this.modeLanguage;
    console.log(documentValue);
    this.isLoading = true;
    this.instructorResourceService.updateResource(this.editingResource, this.courseId)
      .subscribe(data => {
        this.editingResource = data as ResourceCodeSnippet;
        this.toastService.addSaveToast('Resource Saved',
          'Resource ' + this.editingResource.name + ' of course ' +
        this.editingResource.courseName + ' saved successfully.');
        this.isLoading = false;
      });
  }

  loadLanguages() {
    // @ts-ignore
    require('node_modules/codemirror/mode/javascript/javascript.js');
    // @ts-ignore
    require('node_modules/codemirror/mode/clike/clike.js');
    // @ts-ignore
    require('node_modules/codemirror/mode/python/python.js');
    // @ts-ignore
    require('node_modules/codemirror/mode/php/php.js');
    // @ts-ignore
    require('node_modules/codemirror/mode/htmlmixed/htmlmixed.js');
    // @ts-ignore
    require('node_modules/codemirror/mode/markdown/markdown.js');
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

  selectedLanguageChanged(value: any) {
    this.modeLanguage = value;
    this.editor.setOption('mode', this.modeLanguage);
  }
}
