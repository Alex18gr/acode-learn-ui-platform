import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ResourceCodeSnippet } from '../../../../../core/models/resource-models/resource-code-snippet.model';
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'app-viewer-code',
  templateUrl: './viewer-code.component.html',
  styleUrls: ['./viewer-code.component.css'],
})
export class ViewerCodeComponent implements OnInit, OnChanges {
  @Input() resource: ResourceCodeSnippet;
  @ViewChild('viewer', { static: true }) editorElementRef: ElementRef;
  editor: CodeMirror;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.resource &&
      changes.resource.currentValue !== changes.resource.previousValue
    ) {
      this.initViewer();
    }
  }

  initViewer() {
    // load the languages styles
    this.loadLanguages();

    this.editor = new CodeMirror.fromTextArea(
      this.editorElementRef.nativeElement,
      {
        lineNumbers: true,
        mode: {
          name: this.resource.snippetLanguage,
          globalVars: true,
        },
        readOnly: true,
        viewportMargin: Infinity,
      }
    );
    this.editor.setSize(null, 'auto');
    this.editor.getDoc().setValue(this.resource.snippetDocumentData);
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
}
