import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCoursesComponent } from './instructor-courses.component';

describe('InstructorCoursesComponent', () => {
  let component: InstructorCoursesComponent;
  let fixture: ComponentFixture<InstructorCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
