import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseAnnouncementsComponent } from './instructor-course-announcements.component';

describe('InstructorCourseAnnouncementsComponent', () => {
  let component: InstructorCourseAnnouncementsComponent;
  let fixture: ComponentFixture<InstructorCourseAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorCourseAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
