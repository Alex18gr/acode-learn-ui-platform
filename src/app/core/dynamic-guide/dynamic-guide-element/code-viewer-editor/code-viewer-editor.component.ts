import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ResourceCodeSnippet} from '../../../models/resource-models/resource-code-snippet.model';
import * as CodeMirror from 'codemirror';
import {InstructorResourceService} from '../../../../instructor/resource/instructor-resource.service';
import {ToastService} from '../../../toast/toast.service';
import {Resource} from '../../../models/resource-models/resource.model';

@Component({
  selector: 'app-code-viewer-editor',
  templateUrl: './code-viewer-editor.component.html',
  styleUrls: ['./code-viewer-editor.component.css']
})
export class CodeViewerEditorComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('editor', {static: false}) editorElementRef: ElementRef;
  @ViewChild('editForm', {static: false}) editForm: NgForm;
  @Input() resource: ResourceCodeSnippet;
  @Input() editMode: boolean;
  @Input() courseId;
  title = '';
  language = '';
  isDisabled = true;
  isEditing = false;
  private modeLanguage = '';
  private editorCurrentValue: string;
  disabledMode = false;
  editor: any;
  loading = true;
  private isSaving = false;

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
              private toastService: ToastService) { }

  startEditMode() {
    if (this.editMode) {
      this.editorCurrentValue = this.editor.getValue();
      this.isEditing = true;
      // if (this.disabledMode) {
      this.isDisabled = false;
      this.editForm.setValue({
        title: this.resource.snippetTitle,
        language: this.resource.snippetLanguage
      });
      this.editor.setOption('readOnly', this.isDisabled);
      // }
    }
  }

  createEditor() {
    this.modeLanguage = this.language;
    this.editor = new CodeMirror.fromTextArea(this.editorElementRef.nativeElement,
      {
        lineNumbers: true,
        mode: {
          name: this.resource.snippetLanguage,
          globalVars: true
        },
        readOnly: this.isDisabled,
        viewportMargin: Infinity
      }
    );
    this.editor.setOption('readOnly', this.isDisabled);
    this.editor.setSize(null, 'auto');
    this.editor.getDoc().setValue(this.resource.snippetDocumentData);
    this.loading = false;
  }

  ngOnInit() {
    // this.initEditor();
    //
    //
    // // if (this.defaultValue != null) {
    // //   this.editor.setValue(this.defaultValue);
    // // }


    // if (this.isDisabled) {
    //   this.disabledMode = true;
    // }
  }

  ngAfterViewInit(): void {
    this.initEditor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resource && (changes.resource.previousValue !== changes.resource.currentValue)) {
      // this.initEditor();
    }
  }

  private initEditor() {
    this.loadLanguages();
    this.createEditor();
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

  onSaveCodeDocument() {
    // maybe here check authorization
    const documentValue = this.editor.getValue();
    console.log(documentValue);
  }

  onCancelEditing() {
    if (this.editMode) {
      this.editForm.resetForm();
      this.isEditing = false;
      this.editor.setValue(this.editorCurrentValue);
      // if (this.disabledMode) {
      this.isDisabled = true;
      this.editor.setOption('readOnly', this.isDisabled);
      // }
    }
  }

  onEditFormSubmit() {
    if (this.editMode) {
      console.log(this.editForm.value);
      this.title = this.editForm.value.title;
      this.modeLanguage = this.editForm.value.language;
      this.editor.setOption('mode', this.modeLanguage);
      this.resource.snippetLanguage = this.editForm.value.language;
      this.resource.snippetTitle = this.editForm.value.title;
      this.isSaving = true;
      this.saveChanges().subscribe((data) => {
        this.toastService.addResourceSavedSuccessfully(data as Resource);
        this.isEditing = false;
        this.isSaving = false;
        // if (this.disabledMode) {
        this.isDisabled = true;
        this.editor.setOption('readOnly', this.isDisabled);
      },
        error => {
        this.isSaving = false;
        this.toastService.addResourceSaveErrorSuccessfully(this.resource);
        });
      // }
    }
  }

  private saveChanges() {
    // here we save the changes to the sever
    return this.instructorResourceService.updateResource(this.resource, this.courseId);
  }
}
