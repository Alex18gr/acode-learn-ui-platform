import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNavbarComponent } from './course-navbar.component';

describe('CourseNavbarComponent', () => {
  let component: CourseNavbarComponent;
  let fixture: ComponentFixture<CourseNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
