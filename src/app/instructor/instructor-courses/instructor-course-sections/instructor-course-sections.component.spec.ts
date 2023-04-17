import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseSectionsComponent } from './instructor-course-sections.component';

describe('InstructorCourseSectionsComponent', () => {
  let component: InstructorCourseSectionsComponent;
  let fixture: ComponentFixture<InstructorCourseSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCourseSectionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
