import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSectionPageComponent } from './course-section-page.component';

describe('CourseSectionPageComponent', () => {
  let component: CourseSectionPageComponent;
  let fixture: ComponentFixture<CourseSectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseSectionPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
