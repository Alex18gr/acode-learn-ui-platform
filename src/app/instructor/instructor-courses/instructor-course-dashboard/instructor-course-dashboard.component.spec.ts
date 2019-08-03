import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseDashboardComponent } from './instructor-course-dashboard.component';

describe('InstructorCourseDashboardComponent', () => {
  let component: InstructorCourseDashboardComponent;
  let fixture: ComponentFixture<InstructorCourseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorCourseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
