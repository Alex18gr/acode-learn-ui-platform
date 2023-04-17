import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ResourceCodeSnippet } from '../../../../../core/models/resource-models/resource-code-snippet.model';
import { ResourceMarkdown } from '../../../../../core/models/resource-models/resource-markdown.model';
import * as MarkdownIt from 'markdown-it';

@Component({
  selector: 'app-viewer-markdown',
  templateUrl: './viewer-markdown.component.html',
  styleUrls: ['./viewer-markdown.component.css'],
})
export class ViewerMarkdownComponent implements OnInit, OnChanges {
  @Input() resource: ResourceMarkdown;
  private markdownHTML = '<h1>HELLO WORLD!!!</h1>';
  private markdownView: MarkdownIt;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.resource &&
      changes.resource.currentValue !== changes.resource.previousValue
    ) {
      this.initMarkdown();
      this.initMarkdownData();
    }
  }

  initMarkdownData() {
    this.markdownHTML = this.markdownView.render(
      this.resource.markdownDocumentData
    );
  }

  initMarkdown() {
    this.markdownView = new MarkdownIt();
  }
}
