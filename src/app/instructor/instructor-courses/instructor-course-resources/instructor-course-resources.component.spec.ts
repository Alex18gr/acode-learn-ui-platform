import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseResourcesComponent } from './instructor-course-resources.component';

describe('InstructorCourseResourcesComponent', () => {
  let component: InstructorCourseResourcesComponent;
  let fixture: ComponentFixture<InstructorCourseResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCourseResourcesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
