import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseListItemComponent } from './instructor-course-list-item.component';

describe('InstructorCourseListItemComponent', () => {
  let component: InstructorCourseListItemComponent;
  let fixture: ComponentFixture<InstructorCourseListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCourseListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
