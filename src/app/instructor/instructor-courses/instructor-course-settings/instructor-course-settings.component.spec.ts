import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseSettingsComponent } from './instructor-course-settings.component';

describe('InstructorCourseSettingsComponent', () => {
  let component: InstructorCourseSettingsComponent;
  let fixture: ComponentFixture<InstructorCourseSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCourseSettingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
