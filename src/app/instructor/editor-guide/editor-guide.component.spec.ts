import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorGuideComponent } from './editor-guide.component';

describe('EditorGuideComponent', () => {
  let component: EditorGuideComponent;
  let fixture: ComponentFixture<EditorGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorGuideComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
