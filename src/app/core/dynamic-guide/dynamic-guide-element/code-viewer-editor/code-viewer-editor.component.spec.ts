import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeViewerEditorComponent } from './code-viewer-editor.component';

describe('CodeViewerEditorComponent', () => {
  let component: CodeViewerEditorComponent;
  let fixture: ComponentFixture<CodeViewerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeViewerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeViewerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
