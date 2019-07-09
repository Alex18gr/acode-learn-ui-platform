import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAnouncementsComponent } from './course-announcements.component';

describe('CourseAnouncementsComponent', () => {
  let component: CourseAnouncementsComponent;
  let fixture: ComponentFixture<CourseAnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
