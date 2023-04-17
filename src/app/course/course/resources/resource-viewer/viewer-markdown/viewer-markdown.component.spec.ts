import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerMarkdownComponent } from './viewer-markdown.component';

describe('ViewerMarkdownComponent', () => {
  let component: ViewerMarkdownComponent;
  let fixture: ComponentFixture<ViewerMarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewerMarkdownComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
