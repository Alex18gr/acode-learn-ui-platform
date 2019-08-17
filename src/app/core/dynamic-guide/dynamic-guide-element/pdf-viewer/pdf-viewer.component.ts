import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ResourceCodeSnippet} from '../../../models/resource-models/resource-code-snippet.model';
import {ResourceFile} from '../../../models/resource-models/resource-file.model';
import * as PdfJs from 'node_modules/pdfjs-dist/build/pdf.js';
import {InstructorResourceService} from '../../../../instructor/resource/instructor-resource.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit, OnChanges {
  @ViewChild('canvasContainer', {static: false}) pdfViewContainer: ElementRef;
  @Input() resource: ResourceFile;
  @Input() editMode: boolean;
  @Input() courseId;
  @Input() pagesList: number[];
  @Input() options;
  private pdfDoc = null;
  private totalPages: number;
  private pageIsRendering = false;
  private pdfViewerContext: any;

  constructor(private instructorResourceService: InstructorResourceService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resource && (changes.resource.previousValue !== changes.resource.currentValue)) {
      this.initPdf();
    }
  }

  private initPdf() {
    this.instructorResourceService.getFileDataArrayBuffer(this.resource, this.courseId)
      .subscribe((data: ArrayBuffer) => {
        this.initPdfData(data);
      });
  }

  private initPdfData(data: ArrayBuffer) {
    PdfJs.getDocument({data}).promise.then(pdfDocument => {
      this.setViewDocument(pdfDocument);
    });
  }

  setViewDocument(pdfDocument) {
    this.pdfDoc = pdfDocument;
    this.totalPages = pdfDocument.numPages;

    if (!this.pagesList) {
      this.renderPages(this.range(1, this.totalPages));
    } else {
      this.renderPages(this.pagesList);
    }
  }

  renderPages(pagesList: number[]) {
    this.renderPagesArray(pagesList);
  }

  renderPagesArray(pagesArr: number[]) {
    // indicated that the page is rendering
    this.pageIsRendering = true;
    const renderingPage = pagesArr.shift();

    // get the page from the pdf document in order to render it
    this.pdfDoc.getPage(renderingPage).then(page => {
      let viewport = page.getViewport(1);
      const myScale = this.pdfViewContainer.nativeElement.clientWidth / viewport.width;
      // set the scale to the dynamic scale based on the element and viewport width
      viewport = page.getViewport({scale: myScale});
      const mCanvas = document.createElement('canvas');
      mCanvas.style.width = '100%';
      mCanvas.style.display = 'block';
      mCanvas.height = viewport.height;
      mCanvas.width = viewport.width;
      this.pdfViewerContext = mCanvas.getContext('2d');

      const renderCtx = {
        canvasContext: this.pdfViewerContext,
        viewport
      };

      page.render(renderCtx).promise.then(() => {
        // when finishing the rendering
        this.pageIsRendering = false;
        // append the child canvas to the canvas container with the other pages
        this.pdfViewContainer.nativeElement.appendChild(mCanvas);

        // set the pending number page to null because the rendering is finished
        if (pagesArr.length > 0) {
          this.renderPagesArray(pagesArr);
        }
      });
    });
  }

  private range(start, end) {
    // @ts-ignore
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
  }
}
