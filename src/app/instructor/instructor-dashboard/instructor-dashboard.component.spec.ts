import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDashboardComponent } from './instructor-dashboard.component';

describe('InstructorDashboardComponent', () => {
  let component: InstructorDashboardComponent;
  let fixture: ComponentFixture<InstructorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
