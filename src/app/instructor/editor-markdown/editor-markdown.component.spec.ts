import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMarkdownComponent } from './editor-markdown.component';

describe('EditorMarkdownComponent', () => {
  let component: EditorMarkdownComponent;
  let fixture: ComponentFixture<EditorMarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorMarkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
