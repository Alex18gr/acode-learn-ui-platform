import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseHomeComponent } from './instructor-course-home.component';

describe('InstructorCourseHomeComponent', () => {
  let component: InstructorCourseHomeComponent;
  let fixture: ComponentFixture<InstructorCourseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorCourseHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
